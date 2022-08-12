from django.urls import path
from jan_dhan_darshak.feedback.api.views import (
    DeveloperFeedbackView,
    FinancialPointFeedbackCreateView,
    FinancialPointFeedbackListView,
)

app_name = "feedback"

urlpatterns = [
    path("developer", DeveloperFeedbackView.as_view(), name="developer-feedback"),
    path(
        "financial",
        FinancialPointFeedbackCreateView.as_view(),
        name="financial-point-feedback",
    ),
    path(
        "financial-list",
        FinancialPointFeedbackListView.as_view(),
        name="financial-point-list",
    ),
]
