from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Participant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    secret_name = db.Column(db.String(100), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hobbies = db.Column(db.Text)
    unwanted_gifts = db.Column(db.Text)
    assigned_child = db.Column(db.String(100))
    
    def to_dict(self):
        return {
            'name': self.name,
            'secret_name': self.secret_name,
            'phone': self.phone,
            'email': self.email,
            'hobbies': self.hobbies,
            'unwanted_gifts': self.unwanted_gifts,
            'assigned_child': self.assigned_child
        }