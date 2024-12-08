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

Backend Initial Requirements.txt
flask==2.1.0
werkzeug==2.1.1
flask-sqlalchemy==2.5.1
flask-cors==3.0.10
python-dotenv==0.20.0
pytz==2023.3
requests==2.26.0
email-validator==1.1.3
gunicorn==20.1.0


https://render.com/docs/web-services?_gl=1*1jri2g3*_gcl_au*MTIwMDc0MDkyMS4xNzMzNjQ2NDU1*_ga*NDA2MDQxOTM0LjE3MzM2NDY0NTY.*_ga_QK9L9QJC5N*MTczMzY0ODQ3OS4yLjEuMTczMzY0OTY2MS42MC4wLjA.#port-binding
