import os
import hashlib
import secrets
from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv

class AdminAuth:
    def __init__(self):
        load_dotenv()
        self.admin_username = os.getenv('ADMIN_USERNAME')
        self.admin_password = os.getenv('ADMIN_PASSWORD')
        self.admin_token = self._generate_admin_token()

    def _generate_admin_token(self):
        return secrets.token_hex(32)

    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def validate_credentials(self, username, password):
        if not self.admin_username or not self.admin_password:
            raise ValueError("Admin credentials not configured")

        hashed_input_password = self._hash_password(password)
        hashed_stored_password = self._hash_password(self.admin_password)

        return (username == self.admin_username and 
                hashed_input_password == hashed_stored_password)

    def admin_required(self, f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('X-Admin-Token')
            
            if not token or token != self.admin_token:
                return jsonify({
                    'error': 'Unauthorized',
                    'message': 'Admin access required'
                }), 403
            
            return f(*args, **kwargs)
        return decorated_function