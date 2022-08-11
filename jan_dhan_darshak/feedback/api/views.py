from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from jan_dhan_darshak.feedback.models import DeveloperFeedback
from jan_dhan_darshak.feedback.api.serializers import DeveloperFeedbackSerializer
from rest_framework.response import Response
from rest_framework import status


class DeveloperFeedbackView(generics.CreateAPIView):

    queryset = DeveloperFeedback.objects.all()
    serializer_class = DeveloperFeedbackSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        feedback_form = serializer.create(validated_data)

        feedback_form = DeveloperFeedbackSerializer(feedback_form).data

        return Response(
            response_payload(
                success=True, data=feedback_form, msg="Thanks for the feedback."
            ),
            status=status.HTTP_200_OK,
        )
