import email
from django.db import models
from jan_dhan_darshak.users.models import User
from django.utils.translation import gettext_lazy as _


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
