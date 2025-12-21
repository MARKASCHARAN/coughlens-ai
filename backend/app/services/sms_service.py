from twilio.rest import Client
import os

class SMSService:

    def __init__(self):
        self.client = Client(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )

    def send_otp(self, phone: str, otp: str):
        self.client.messages.create(
          body=f"Your CoughLens AI OTP is {otp}",
          from_=os.getenv("TWILIO_PHONE_NUMBER"),
          to=f"+91{phone}"
       )

