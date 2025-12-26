import smtplib
import os
from email.mime.text import MIMEText

class EmailService:

    @staticmethod
    def send_otp(email: str, otp: str):
        msg = MIMEText(f"Your CoughLens AI OTP is {otp}")
        msg["Subject"] = "CoughLens AI Login OTP"
        msg["From"] = os.getenv("EMAIL_FROM")
        msg["To"] = email

        server = smtplib.SMTP(
            os.getenv("EMAIL_HOST"),
            int(os.getenv("EMAIL_PORT"))
        )
        server.starttls()
        server.login(
            os.getenv("EMAIL_USERNAME"),
            os.getenv("EMAIL_PASSWORD")
        )
        server.send_message(msg)
        server.quit()
