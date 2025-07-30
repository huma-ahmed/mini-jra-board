from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from .models import db, User, Task

main = Blueprint('main', __name__)

@main.route("/")
def home():
    return "Welcome to Task Manager!"

@main.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    hashed_pw = generate_password_hash(password)
    user = User(username=username, email=email, password=hashed_pw)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User successfully registered"}), 201

@main.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@main.route("/logout", methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out"}), 200

@main.route("/api/tasks", methods=['POST'])
@login_required
def create_task():
    data = request.get_json()
    task = Task(
        name=data['name'],
        description=data['description'],
        status=data['status'],
        reporter_id=current_user.id,
        comments=data.get('comments')
    )
    
    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"}), 201

@main.route("/api/tasks", methods=["GET"])
@login_required
def get_tasks():
    status_filter = request.args.get('status')

    if status_filter:
        tasks = Task.query.filter_by(status=status_filter).all()  
    else:
        tasks = Task.query.all()

    return jsonify([task.to_dict() for task in tasks])

@main.route('/api/tasks/<int:task_id>', methods=['GET'])
@login_required
def get_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"message": "Task not found"}), 404
    return jsonify(task.to_dict())


@main.route("/api/tasks/<int:task_id>", methods=["PUT"])
@login_required
def edit_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.reporter_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    task.name = data['name']
    task.description = data['description']
    task.status = data['status']
    task.comments=data.get('comments')
    db.session.commit()

    return jsonify({"message": "Task updated"}), 200

@main.route("/api/tasks/<int:task_id>", methods=["DELETE"])
@login_required
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.reporter_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200

@main.route("/api/users", methods=["GET"])
@login_required
def get_all_users():
    users = User.query.all()
    user_list = [
        {"id": user.id, "username": user.username}
        for user in users
    ]
    return jsonify(user_list), 200