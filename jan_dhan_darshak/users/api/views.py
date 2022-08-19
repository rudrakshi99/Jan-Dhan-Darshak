from django.contrib.auth import get_user_model
from jan_dhan_darshak.users.utils import TwilioHandler
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import (
    UserSignUpSerializer,
    VerifyOTPSerializer,
    UserSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from jan_dhan_darshak.core.utils import response_payload
from rest_framework.views import APIView
import speech_recognition as sr
from pydub import AudioSegment


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "username"

    def get_queryset(self):
        return self.queryset.all()


class UserLoginViewset(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer

    def create(self, request, *args, **kwargs):

        try:
            # login
            user = User.objects.get(phone_number=request.data.get("phone_number"))
        except User.DoesNotExist:
            # signup
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.create(serializer.validated_data)
        except Exception as e:
            error_key = list(e.__dict__["detail"].keys())[0]
            message = e.__dict__["detail"][error_key][0]
            return Response(
                response_payload(success=False, msg=f"{message}"),
                status=status.HTTP_400_BAD_REQUEST,
            )

        twilio_handler = TwilioHandler()
        twilio_handler.send_otp(user.phone_number)
        return Response(
            response_payload(
                success=True,
                data={},
                msg="Otp has been generated to your registered phone number",
            )
        )

    def verify(self, request, *args, **kwargs):
        try:
            serializer = VerifyOTPSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            user = User.objects.filter(phone_number=validated_data.get("phone_number"))

            if not user.exists():
                raise AuthenticationFailed(
                    response_payload(
                        success=False, msg="Invalid credentials, try again"
                    )
                )

            user = user.first()
            if not user.is_active:
                raise AuthenticationFailed(
                    response_payload(
                        success=False, msg="Account disabled, contact admin"
                    )
                )

            twilio_handler = TwilioHandler()
            otp_verified = twilio_handler.verify_otp(
                phone_number=user.phone_number, otp=validated_data.get("otp")
            )

            if otp_verified:
                user.is_verified = True
                user.save()
                return Response(
                    response_payload(
                        success=True,
                        data={
                            "user": UserSerializer(user).data,
                            "tokens": user.tokens(),
                        },
                        msg="Otp has been Verified",
                    )
                )
            else:
                return Response(
                    response_payload(
                        success=False,
                        msg="Incorrect Otp, Try Again",
                    ),
                    status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            error_key = list(e.__dict__["detail"].keys())[0]
            message = e.__dict__["detail"][error_key][0]
            return Response(
                response_payload(success=False, msg=f"{message}"),
                status=status.HTTP_400_BAD_REQUEST,
            )




class VoiceToText(APIView):
    def post(self, request, **kwargs):
        voice = request.data.get("voice")
        try:
            r = sr.Recognizer()
            with sr.AudioFile(voice) as source:
                audio_data = r.record(source)
                text = r.recognize_google(audio_data)
            return Response(
                response_payload(
                    success=True,
                    data={"msg": text},
                    msg="Voice to text converted successfully!",
                )
            )
        except Exception as e:
            return Response(
                response_payload(success=False, msg=str(e)),
                status=status.HTTP_400_BAD_REQUEST,
            )
