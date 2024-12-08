# secret-santa-app

Folder Structure

backend/
│
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables
│
├── models/
│   └── __init__.py         # Database models
│   └── participant.py      # Participant model
│
├── services/
│   └── __init__.py
│   └── email_service.py    # Email sending logic
│   └── admin_auth.py       # Admin authentication
│
├── utils/
│   └── __init__.py
│   └── error_handlers.py   # Centralized error handling
│
└── Dockerfile              # Docker configuration

frontend/
│
├── public/
│   └── index.html          # Main HTML file
│
├── src/
│   ├── components/
│   │   └── RegistrationForm.js
│   │   └── Leaderboard.js
│   │   └── CountdownTimer.js
│   │
│   ├── services/
│   │   └── api.js          # Axios configuration
│   │
│   ├── App.js              # Main React component
│   ├── index.js            # Entry point
│
├── package.json            # NPM dependencies
└── .env                    # Environment variables


pip install --upgrade sqlalchemy flask-sqlalchemy
