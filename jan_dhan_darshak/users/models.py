import uuid
from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, TextChoices, UUIDField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Default custom user model for Jan Dhan Darshak.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    class UserType(TextChoices):
        ADMIN = "AD", _("ADMIN")
        CUSTOMER = "CU", _("CUSTOMER")
        SALES_PERSON = "SP", _("SALES PERSON")

    #: First and last name do not cover name patterns around the globe
    uuid = UUIDField(default=uuid.uuid4, editable=False, db_index=True)
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
    user_type = CharField(
        max_length=20,
        choices=UserType.choices,
        default=UserType.CUSTOMER,
    )
    phone_number = CharField(max_length=10, null=True, unique=True)
    
    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})
