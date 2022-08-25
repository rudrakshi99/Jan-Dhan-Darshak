from datetime import datetime


from django.contrib.auth import get_user_model
from jan_dhan_darshak.users.models import VoiceToText
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
            "phone_number",
        ]

    # extra_kwargs = {"url": {"view_name": "api:user-detail", "lookup_field": "username"}}


class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "phone_number", "email"]

    def create(self, validated_data):
        return User.objects.create(**validated_data, is_active=True)


class VerifyOTPSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required=True, write_only=True)
    phone_number = serializers.CharField(
        required=True, validators=[validator_mobile_number]
    )


class UserUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ["name", "email"]


class VoiceToTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceToText
        fields = "__all__"
