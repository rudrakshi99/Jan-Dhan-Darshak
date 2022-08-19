from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from django.core.mail import send_mail

import logging
import traceback

from jan_dhan_darshak.financial_point.models import FinancialPoint
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User


User = get_user_model()

logger = logging.getLogger()


@receiver(post_save, sender=FinancialPoint)
def financial_point(sender, instance, created, **kwargs):
    if created:
        try:
            feedback_grp = Group.objects.get(name="FeedbackViewer")

            user = User.objects.create(
                email=instance.email,
                phone_number=instance.phone_number,
                name=instance.financial_point_name,
            )
            user.set_password(f"{instance.phone_number}_{instance.unique_id}")
            # user.set_password(f"12345")
            user.is_staff = True
            user.save()

            user.groups.add(feedback_grp)

            subject = "Welcome to Jan Dhan Darshak"
            message = (
                f"Hi {instance.username}. You have been registered to Jan Dhan Darshak.\n"
                f"Your username is '{user.username}' and password is in format 'phonenumber_uniqueid'.\n"
                "Please login to your account on 'https://jan-dhan-darshak.herokuapp.com/admin/' to get started.\n\n"
                "Thank you.\nTEAM JAN DHAN DARSHAK."
            )
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [
                instance.email,
            ]
            send_mail(subject, message, email_from, recipient_list)
        except Exception as e:
            logger.error(
                "Error on financial point signals:"
                f"Stacktrace : {traceback.format_exc()}",
            )
