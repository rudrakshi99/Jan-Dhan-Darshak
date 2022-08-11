from django.urls import path
from jan_dhan_darshak.feedback.api.views import DeveloperFeedbackView

app_name = "feedback"

urlpatterns = [
    path("developer", DeveloperFeedbackView.as_view(), name="developer-feedback"),
]
