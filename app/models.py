from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

from . import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)                  # Unique ID
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)          # Hashed password


class Task(db.model):
    id=db.column(db.integer,primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    attachment_filename = db.Column(db.String(255))
    status = db.Column(db.String(50), default='To Do')  # to do, in progress, blocked, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='tasks')
    
    comments = db.relationship('Comment', backref='task', cascade="all, delete-orphan")

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)

