from django.db import models
from jan_dhan_darshak.users.models import User

# Create your models here.
class SavedLocation(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    place_id = models.CharField(max_length=200)

    def __str__(self):
        return self.place_id
