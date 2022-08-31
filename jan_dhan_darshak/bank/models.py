from django.db import models

# Create your models here.


class Bank(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    ifsc = models.CharField(max_length=11)
    address = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
