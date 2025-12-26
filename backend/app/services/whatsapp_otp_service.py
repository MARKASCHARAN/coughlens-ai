import os
from twilio.rest import Client

class WhatsAppOTPService:
    def __init__(self):
        self.client = Client(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )

    def send_otp(self, phone: str, otp: str):
        message = self.client.messages.create(
            body=f"🔐 Your CoughLens AI OTP is: {otp}",
            from_="whatsapp:+14155238886",
            to=f"whatsapp:{phone}"
        )
        return message.sid
