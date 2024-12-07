import os
from dotenv import load_dotenv
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import ssl

class EmailService:
    def __init__(self):
        load_dotenv()
        
        self.email_host = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
        self.email_port = int(os.getenv('EMAIL_PORT', 587))
        self.email_host_user = os.getenv('EMAIL_HOST_USER')
        self.email_host_password = os.getenv('EMAIL_HOST_PASSWORD')
        
        self._validate_config()

    def _validate_config(self):
        if not all([self.email_host_user, self.email_host_password]):
            raise ValueError("Email configuration is incomplete")

    def send_email(self, to_email, subject, body):
        try:
            context = ssl.create_default_context()

            msg = MIMEMultipart()
            msg['From'] = self.email_host_user
            msg['To'] = to_email
            msg['Subject'] = subject

            msg.attach(MIMEText(body, 'plain'))

            with smtplib.SMTP(self.email_host, self.email_port) as server:
                server.starttls(context=context)
                server.login(self.email_host_user, self.email_host_password)
                server.send_message(msg)

            return True
        except Exception as e:
            logging.error(f"Failed to send email: {str(e)}")
            return False