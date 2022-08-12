from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import (
    VerifyOtpSerializer,
    LoginWithOtpSerializer,
    UserSerializer,
    UserSignupSerializer,
)
from rest_framework.permissions import IsAuthenticated

from jan_dhan_darshak.core.utils import response_payload

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "username"

    def get_queryset(self):
        return self.queryset.all()


class SignUpViewset(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    @action(detail=False, methods=["post"])
    def signup(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        user = serializer.create(validated_data)
        user_data = UserSignupSerializer(user).data

        return Response(
            response_payload(success=True, data=user_data, msg="Otp Has been Sent"),
            status=status.HTTP_200_OK,
        )


class LoginOtpViewset(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = LoginWithOtpSerializer

    @action(detail=False, methods=["post"])
    def otp_login(self, request, *args, **kwargs):
        serializer = LoginWithOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            response_payload(success=True, msg="OTP has been sent Successfully"),
            status=status.HTTP_200_OK,
        )


class VerifyOtpViewset(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = VerifyOtpSerializer

    @action(detail=False, methods=["post"])
    def verify_otp(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            response_payload(
                success=True, data=serializer.data, msg="Logged in Successfully"
            )
        )
