from django.urls import path

from jan_dhan_darshak.users.api.views import VerifyOtpViewset

app_name = "users"
urlpatterns = [
    path(
        "verify_otp/",
        view=VerifyOtpViewset.as_view({"post": "verify_otp"}),
        name="verify_otp",
    ),
]
