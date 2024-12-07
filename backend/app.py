import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models.participant import db, Participant
from services.email_service import EmailService
from services.admin_auth import AdminAuth
from utils.error_handlers import setup_error_handlers
import pytz
from datetime import datetime
import random

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///secret_santa.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize services
email_service = EmailService()
admin_auth = AdminAuth()

# Setup error handlers
setup_error_handlers(app)

# Registration Route
@app.route('/register', methods=['POST'])
def register_participant():
    data = request.json
    
    # Validate registration deadline
    ist = pytz.timezone('Asia/Kolkata')
    deadline = ist.localize(datetime(2024, 12, 20, 23, 59, 59))
    now = datetime.now(ist)
    
    if now > deadline:
        return jsonify({'error': 'Registration deadline has passed'}), 400

    # Check for existing registrations
    existing_email = Participant.query.filter_by(email=data['email']).first()
    existing_secret_name = Participant.query.filter_by(secret_name=data['secretName']).first()
    
    if existing_email:
        return jsonify({'error': 'Email already registered'}), 400
    
    if existing_secret_name:
        return jsonify({'error': 'Secret name already taken'}), 400

    # Create new participant
    new_participant = Participant(
        name=data['name'],
        secret_name=data['secretName'],
        phone=data['phone'],
        email=data['email'],
        hobbies=data['hobbies'],
        unwanted_gifts=', '.join(data['unwantedGifts'])
    )
    
    db.session.add(new_participant)
    db.session.commit()

    return jsonify({'message': 'Registration successful', 'participant': new_participant.to_dict()}), 201

# Admin Login Route
@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        if admin_auth.validate_credentials(username, password):
            return jsonify({
                'message': 'Login successful',
                'token': admin_auth.admin_token
            }), 200
        else:
            return jsonify({
                'error': 'Invalid credentials'
            }), 401
    except ValueError as e:
        return jsonify({'error': str(e)}), 500

# Participant Matching Route (Admin Only)
@app.route('/match-participants', methods=['POST'])
@admin_auth.admin_required
def match_participants():
    participants = Participant.query.all()
    
    if len(participants) < 2:
        return jsonify({'error': 'Not enough participants'}), 400

    # Shuffle participants for random assignment
    shuffled_participants = participants.copy()
    random.shuffle(shuffled_participants)

    # Assign secret santas
    for i in range(len(participants)):
        santa = participants[i]
        assigned_child = shuffled_participants[(i + 1) % len(shuffled_participants)]
        
        santa.assigned_child = assigned_child.name
        
        # Send email to santa about their assigned child
        email_body = f"""
        Dear {santa.name},

        You have been assigned to be the Secret Santa for {assigned_child.name}!

        Child Details:
        - Name: {assigned_child.name}
        - Hobbies: {assigned_child.hobbies}
        - Gifts to Avoid: {assigned_child.unwanted_gifts}

        Enjoy your Secret Santa experience!

        Merry Christmas!
        """
        
        email_service.send_email(santa.email, 'Your Secret Santa Assignment', email_body)
    
    db.session.commit()

    return jsonify({'message': 'Participants matched and emails sent'}), 200

# Registration Deadline Route
@app.route('/registration-deadline', methods=['GET'])
def get_registration_deadline():
    ist = pytz.timezone('Asia/Kolkata')
    deadline = ist.localize(datetime(2024, 12, 20, 23, 59, 59))
    return jsonify({
        'deadline': deadline.isoformat(),
        'remaining_time': str(deadline - datetime.now(ist))
    })

# Participants List Route
@app.route('/participants', methods=['GET'])
def get_participants():
    participants = Participant.query.all()
    return jsonify([p.to_dict() for p in participants])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)