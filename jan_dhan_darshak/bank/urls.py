from django.urls import path
from jan_dhan_darshak.bank.api.views import BankDetailView

app_name = "feedback"

urlpatterns = [
    path("bank-detail/", BankDetailView.as_view(), name="bank-detail"),
]
