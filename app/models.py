from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

from . import db

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)                
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)          # Hashed password


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    
    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reporter = db.relationship('User', backref='tasks')
    status = db.Column(db.String(50), default='To Do')  # To Do, In Progress, Blocked, Completed

    comments = db.relationship('Comment', backref='task', cascade="all, delete-orphan")
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "reporter": self.reporter.username,  # 👈 username shown here
            "comments": [comment.content for comment in self.comments]
        }


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)

