from twilio.rest import Client
import os

class WhatsAppService:
    def __init__(self):
        self.client = Client(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )
        self.from_number = "whatsapp:+14155238886"  # Twilio Sandbox

    def send_message(self, to: str, message: str):
        if not to.startswith("+"):
            to = f"+91{to}"

        msg = self.client.messages.create(
            from_=self.from_number,
            to=f"whatsapp:{to}",
            body=message
        )

        return msg.sid
