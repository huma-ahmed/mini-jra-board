from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

from . import db

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)                
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reporter = db.relationship('User', backref='tasks')
    status = db.Column(db.String(50), default='To Do')

    comments = db.relationship('Comment', backref='task', lazy=True, cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.task_name,
            "description": self.description,
            "status": self.status,
            "reporter": self.reporter.username,
            "reporter_id": self.reporter_id,
            "comments": [c.to_dict() for c in self.comments]
        }
    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.text,
            "task_id": self.task_id,
            "created_at": self.created_at.isoformat()
        }


    

