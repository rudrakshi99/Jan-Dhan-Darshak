import logging
from authy.api import AuthyApiClient
from config.settings.base import TWILIO
from jan_dhan_darshak.core.exceptions import APIExceptionBadRequest
from twilio.rest import Client

logger = logging.getLogger()

# Authy
# class TwilioHandler:
#     def __init__(self) -> None:
#         self.api_key = TWILIO["API_KEY"]
#         self.authy_api = AuthyApiClient(self.api_key)

#     def create_or_get_user(self, email, phone_number):
#         user = self.authy_api.users.create(
#             email=email, phone=str(phone_number), country_code=91
#         )
#         logger.info(f"Response from create user: {user.content}")

#         if user.ok():
#             return user.id
#         else:
#             return user.errors()

#     def send_otp(self, auth_id):
#         sms = self.authy_api.users.request_sms(auth_id)
#         logger.info(f"Response from send otp: {sms.content}")
#         if sms.ok():
#             logger.info(f"Otp has been sent successfully")

#     def verify_otp(self, auth_id, otp):

#         verification = self.authy_api.tokens.verify(auth_id, token=str(otp))
#         logger.info(f"Response from verify otp: {verification.content}")

#         if verification.ok():
#             logger.info(f"Otp has been verified successfully")
#             return True
#         else:
#             return False

#     def get_user_status(self, auth_id):
#         status = self.authy_api.users.status(auth_id)

#         return status.content


# Verify
class TwilioHandler:
    def __init__(self) -> None:
        # api_key = TWILIO["API_KEY"]
        account_sid = TWILIO["ACCOUNT_SID"]
        auth_token = TWILIO["AUTH_TOKEN"]
        self.service_id = "VAe4022cd5058b280e816e903529b0c7aa"
        self.client = Client(account_sid, auth_token)

    def send_otp(self, phone_number):
        verification = self.client.verify.v2.services(
            self.service_id
        ).verifications.create(to="+91" + phone_number, channel="sms")

        print(verification.__dict__)

        if verification.status == "pending":
            return True
        else:
            raise APIExceptionBadRequest("Error while sending the otp")

    def verify_otp(self, phone_number, otp):
        verification_check = self.client.verify.v2.services(
            self.service_id
        ).verification_checks.create(to="+91" + phone_number, code=otp)

        print(verification_check.__dict__)

        if verification_check.status == "approved":
            return True
        elif verification_check.status == "pending":
            return False
        else:
            raise APIExceptionBadRequest("Error while sending the otp")
