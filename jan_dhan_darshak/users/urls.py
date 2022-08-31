from django.urls import path

from jan_dhan_darshak.users.api.views import (
    UserLoginViewset,
    UserUpdateView,
    VoiceToText,
    UserNotificationCreateView,
)  # , VerifyOtpViewset

from jan_dhan_darshak.users.views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
)

app_name = "users"
urlpatterns = [
    # path("~redirect/", view=user_redirect_view, name="redirect"),
    # path("~update/", view=user_update_view, name="update"),
    # path("<str:username>/", view=user_detail_view, name="detail"),
    path("signup/", view=UserLoginViewset.as_view({"post": "create"}), name="signup"),
    path("verify/", view=UserLoginViewset.as_view({"post": "verify"}), name="verify"),
    path("voice-to-text/", view=VoiceToText.as_view(), name="voicetotext"),
    path("update/<int:id>", view=UserUpdateView.as_view(), name="user_update"),
    path("remainder/", UserNotificationCreateView.as_view(), name="remainder"),
]
