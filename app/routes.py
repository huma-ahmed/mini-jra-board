from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from .forms import RegisterForm, LoginForm
from .models import db, User

main = Blueprint('main', __name__)

@main.route("/")
def home():
    return "Welcome to Task Manager!"


@main.route("/register",methods=['GET','POST'])
def register():
    form=RegisterForm()
    if form.validate_on_submit():

        existing_username=User.query.filter_by(username=form.username.data).first()
        if existing_username:
            flash("Username already exists. Please choose another.", "danger")
            return render_template("register.html", form=form)

        existing_user = User.query.filter_by(email=form.email.data).first()
        if existing_user:
            flash("Email is already registered. Please log in.", "danger")
            return redirect(url_for('main.login'))

        hash_pw=generate_password_hash(form.password.data)

        user=User(
            username=form.username.data,
            email=form.email.data,
            password=hash_pw
        )

        db.session.add(user)
        db.session.commit()

        flash("Account created successfully! Please login.", "success")

        return redirect(url_for('main.login'))
    return render_template('register.html',form=form)

@main.route("/login",methods=['GET','POST'])
def login():
    form=LoginForm()
    if form.validate_on_submit:
        user=User.query.filter_by(username=form.username.data).first()
        
        if user and check_password_hash(user.password,form.password.data):
            login_user(user)
            return redirect(url_for("main.dashboard"))
        else:
            flash("Invalid! Username or Password",'Danger')
        
    return render_template("login.html", form=form)
    
@main.route("/dashboard")
@login_required
def dashboard():
    return render_template('dashboard.html')

# 🔹 LOGOUT ROUTE
@main.route("/logout")
@login_required    #This prevents unauthenticated users from accessing this route by typing /logout manually.
def logout():
    logout_user()
    return redirect(url_for("main.login"))




