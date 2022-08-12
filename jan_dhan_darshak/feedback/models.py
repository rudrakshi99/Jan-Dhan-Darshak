from django.db import models
from django.utils.translation import gettext_lazy as _

from jan_dhan_darshak.users.models import User

TOPIC = (
    ("content_issue", "Content Issue"),
    ("design_issue", "Design Issue"),
    ("server_issue", "Server Issue"),
    ("bug", "Bug"),
)


class DeveloperFeedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(
        _("Phone Number"),
        max_length=10,
    )
    message = models.TextField(blank=True)
    topic = models.CharField(choices=TOPIC, max_length=20)
    rating = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


FINANCIAL_TYPE = (
    ("Bank", "Bank"),
    ("ATM", "ATM"),
    ("CSC", "CSC"),
    ("PO", "Post Office"),
    ("Bank_Mitra", "Bank Mitra"),
)

ID_TYPE = (
    ("IFSC", "IFSC"),
    ("CSC_Id", "CSC Id"),
    ("PIN_Code", "PIN Code"),
)


def user_directory_path(instance, filename):
    return "financial_point/{0}/{1}/{2}".format(
        instance.financial_type,
        instance.financial_point_name,
        filename,
    )


class FinancialPointFeedback(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    financial_type = models.CharField(choices=FINANCIAL_TYPE, max_length=20)
    financial_point_name = models.CharField(max_length=200)
    unique_id_type = models.CharField(choices=ID_TYPE, max_length=20)
    unique_id = models.CharField(max_length=100, unique=True)
    message = models.TextField(blank=True)
    audio_message = models.FileField(upload_to=user_directory_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.financial_point_name
