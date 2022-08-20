from django.db import models

# Create your models here.
from django.db import models
import uuid
from jan_dhan_darshak.users.models import User

# Create your models here.


class MissingSuggestions(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    pointName = models.CharField(max_length=250, blank=False, null=False)
    address = models.CharField(max_length=250, blank=False, null=False)
    otherdetails = models.TextField(max_length=2000, blank=False, null=False)
    latitude = models.DecimalField(
        max_digits=20, decimal_places=14, blank=False, null=False
    )
    longitude = models.DecimalField(
        max_digits=20, decimal_places=14, blank=False, null=False
    )
    suggestion_status = models.CharField(
        max_length=100,
        choices=(
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
            ("Completed", "Completed"),
        ),
        default="Pending",
    )

    def __str__(self):
        return self.pointName
