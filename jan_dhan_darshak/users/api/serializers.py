from datetime import datetime


from django.contrib.auth import get_user_model
from rest_framework import serializers

from rest_framework.exceptions import AuthenticationFailed
from django.contrib import auth
from jan_dhan_darshak.core.validators import validator_mobile_number
from jan_dhan_darshak.core.utils import response_payload
from jan_dhan_darshak.users.utils import TwilioHandler

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "uuid",
            "name",
            "email",
            "address",
            "phone_number",
        ]

    # extra_kwargs = {"url": {"view_name": "api:user-detail", "lookup_field": "username"}}


class UserSignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone_number = serializers.IntegerField(
        required=True, validators=[validator_mobile_number]
    )
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "uuid",
            "name",
            "email",
            "address",
            "phone_number",
        ]
        read_only_fields = ["id", "uuid"]

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                response_payload(success=False, msg="Email already exists!")
            )
        return email

    def validate_phone_number(self, phone_number):
        if User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError(
                response_payload(success=False, msg="Phone Number already exists!")
            )
        return phone_number

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.is_active = True
        user.save()

        twilio_handler = TwilioHandler()
        twilio_user_id = twilio_handler.create_or_get_user(
            email=user.email if user.email else "test@test.com",
            phone_number=user.phone_number,
        )

        user.twilio_user_id = twilio_user_id
        user.save()

        twilio_handler.send_otp(twilio_user_id)
        return user


class LoginWithOtpSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)

    def validate(self, attrs):
        try:
            user = User.objects.get(phone_number=attrs.get("phone_number", ""))
        except:
            raise serializers.ValidationError(
                f"User with phone_number {attrs.get('phone_number', '')} doesn't exists."
            )
        twilio_handler = TwilioHandler()
        twilio_handler.send_otp(auth_id=user.twilio_user_id)
        return user


class VerifyOtpSerializer(serializers.ModelSerializer):
    otp = serializers.IntegerField(required=True, write_only=True)
    phone_number = serializers.CharField(required=True)
    tokens = serializers.SerializerMethodField()
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = [
            "phone_number",
            "tokens",
            "otp",
            "name",
            "email",
            "uuid",
            "id",
        ]
        read_only_fields = ["uuid", "id", "email"]

    def get_tokens(self, obj):
        try:
            user = User.objects.get(phone_number=obj["phone_number"])
        except:
            raise serializers.ValidationError(
                f"User with phone_number {obj['phone_number']} doesn't exists."
            )

        return {"refresh": user.tokens()["refresh"], "access": user.tokens()["access"]}

    def validate(self, data):
        phone_number = data.get("phone_number", "")
        otp = data.get("otp", "")

        user = User.objects.filter(phone_number=phone_number)
        if not user.exists():
            raise AuthenticationFailed(
                response_payload(success=False, msg="Invalid credentials, try again")
            )
        user = user.first()
        if not user.is_active:
            raise AuthenticationFailed(
                response_payload(success=False, msg="Account disabled, contact admin")
            )
        if not user.is_verified:
            raise AuthenticationFailed(
                response_payload(success=False, msg="User is not Verified.")
            )
        twilio_handler = TwilioHandler()
        otp_verified = twilio_handler.verify_otp(auth_id=user.twilio_user_id, otp=otp)
        # if user.otp == 1000:
        #     raise AuthenticationFailed(
        #         response_payload(success=False, msg="Try Resending the otp.")
        #     )
        # elif user.otp_expired():
        #     raise AuthenticationFailed(
        #         response_payload(success=False, msg="Otp has been Expired. Try Again")
        #     )
        # if user.otp == otp:
        #     user.otp = 1000
        #     user.save()
        if otp_verified:
            user.is_verified = True
            user.save()
        else:
            raise AuthenticationFailed(
                response_payload(success=False, msg="Incorrect Otp, Try Again")
            )

        return {
            "tokens": user.tokens,
            "email": user.email,
            "phone_number": user.phone_number,
            "name": user.name,
            "uuid": user.uuid,
            "id": user.id,
        }
