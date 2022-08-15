from django.contrib.auth import get_user_model
from jan_dhan_darshak.users.utils import TwilioHandler
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import (
    UserSignUpSerializer,
    VerifyOTPSerializer,
    # VerifyOtpSerializer,
    # LoginWithOtpSerializer,
    UserSerializer,
    # UserSignupSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from jan_dhan_darshak.core.utils import response_payload

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "username"

    def get_queryset(self):
        return self.queryset.all()


# class SignUpViewset(viewsets.ViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSignupSerializer

#     @action(detail=False, methods=["post"])
#     def signup(self, request, *args, **kwargs):
#         serializer = UserSignupSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         validated_data = serializer.validated_data
#         user = serializer.create(validated_data)
#         user_data = UserSignupSerializer(user).data

#         return Response(
#             response_payload(success=True, data=user_data, msg="Otp Has been Sent"),
#             status=status.HTTP_200_OK,
#         )


# class LoginOtpViewset(viewsets.ViewSet):
#     queryset = User.objects.all()
#     serializer_class = LoginWithOtpSerializer

#     @action(detail=False, methods=["post"])
#     def otp_login(self, request, *args, **kwargs):
#         serializer = LoginWithOtpSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(
#             response_payload(success=True, msg="OTP has been sent Successfully"),
#             status=status.HTTP_200_OK,
#         )


# class VerifyOtpViewset(viewsets.ViewSet):
#     queryset = User.objects.all()
#     serializer_class = VerifyOtpSerializer

#     @action(detail=False, methods=["post"])
#     def verify_otp(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         return Response(
#             response_payload(
#                 success=True, data=serializer.data, msg="Logged in Successfully"
#             )
#         )


class UserLoginViewset(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer
    def create(self, request, *args, **kwargs):
        try:
            user = User.objects.get(
                phone_number=request.data.get("phone_number"), is_verified=False
            )
        except User.DoesNotExist:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.create(serializer.validated_data)
        except Exception as e:
            raise e

        twilio_handler = TwilioHandler()
        twilio_user_id = twilio_handler.create_or_get_user(
            email=user.email if user.email else "test@test.com",
            phone_number=user.phone_number,
        )
        twilio_handler.send_otp(twilio_user_id)

        user.twilio_user_id = twilio_user_id
        user.save()

        return Response(
            response_payload(
                success=True,
                data={},
                msg="Otp has been generated to your registered phone number",
            )
        )

    def verify(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        user = User.objects.filter(phone_number=validated_data.get("phone_number"))

        if not user.exists():
            raise AuthenticationFailed(
                response_payload(success=False, msg="Invalid credentials, try again")
            )

        user = user.first()
        if not user.is_active:
            raise AuthenticationFailed(
                response_payload(success=False, msg="Account disabled, contact admin")
            )

        twilio_handler = TwilioHandler()
        otp_verified = twilio_handler.verify_otp(
            auth_id=user.twilio_user_id, otp=validated_data.get("otp")
        )

        if otp_verified:
            user.is_verified = True
            user.save()
            return Response(
                response_payload(
                    success=True,
                    data={"user": UserSerializer(user).data, "tokens": user.tokens()},
                    msg="Otp has been Verified",
                )
            )

        else:
            raise AuthenticationFailed(
                response_payload(success=False, msg="Incorrect Otp, Try Again")
            )
