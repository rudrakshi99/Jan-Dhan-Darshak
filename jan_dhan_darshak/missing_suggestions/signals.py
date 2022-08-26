from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage

import logging
import traceback

from jan_dhan_darshak.missing_suggestions.models import MissingSuggestions
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User

from jan_dhan_darshak.users.utils import send_notification


User = get_user_model()

logger = logging.getLogger()


@receiver(pre_save, sender=MissingSuggestions)
def missing_suggestions_updating(sender, instance, **kwargs):
    if instance.uid is None:
        pass
    else:
        try:
            previous = MissingSuggestions.objects.get(uid=instance.uid)
            if previous.suggestion_status != instance.suggestion_status:
                print("FOUND")

                message = (
                    f"\n\nHi {instance.User.name}, \n\n"
                    f"Your missing suggestion request for the track ID :{instance.uid} has been {instance.suggestion_status}.\n\n"
                    "Thank you for your suggestion.\n\n"
                    "Regards.\nTEAM JAN DHAN DARSHAK."
                )
            )   
                )

                send_notification(message, instance.User.phone_number)

                print(f"MAIL SENT for user {instance.User.email}")
        except MissingSuggestions.DoesNotExist:
            pass
