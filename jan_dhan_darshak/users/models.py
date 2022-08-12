import uuid
from random import randint
from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, BooleanField, UUIDField
from django.urls import reverse, reverse_lazy
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken


class User(AbstractUser):
    """
    Default custom user model for Jan Dhan Darshak.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    #: First and last name do not cover name patterns around the globe
    uuid = UUIDField(default=uuid.uuid4, editable=False, db_index=True)
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
    phone_number = CharField(max_length=10, unique=True)
    is_verified = BooleanField(default=False)
    twilio_user_id = CharField(max_length=9, blank=True, null=True)

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ["-date_joined"]

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse_lazy("users:detail", kwargs={"username": self.username})
