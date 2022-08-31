from datetime import datetime
import logging
from pydoc import cli

from jan_dhan_darshak.users.models import UserNotification
from jan_dhan_darshak.users.utils import send_notification

logger = logging.getLogger()
from django.contrib.auth import get_user_model


User = get_user_model()
from config.settings.base import TWILIO
from twilio.rest import Client

account_sid = TWILIO["ACCOUNT_SID"]
auth_token = TWILIO["AUTH_TOKEN"]
client = Client(account_sid, auth_token)


def cron_job():
    print("Cron job started")
    try:
        print("TRY")
        notifications = UserNotification.objects.filter(is_completed=False)
        print(notifications)
        for notification in notifications:
            print(notification)
            if notification.set_date.date() == datetime.today().date():

                message = client.messages.create(
                    body=f"{notification.notification}",
                    from_="+13182848686",
                    to="+91" + f"{notification.user.phone_number}",
                )
                print(message.sid)
                notification.is_completed = True
                notification.save()
            else:
                print("Not today")

    except Exception as e:
        print("EXCEPT", e)
    print("Cron job completed")
