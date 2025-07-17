from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField, SelectField, FileField
from wtforms.validators import InputRequired, Email, Length

class RegisterForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=4, max=20)])
    email = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6)])
    submit = SubmitField("Register")

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    submit = SubmitField("Login")

class TaskForm(FlaskForm):
    name = StringField("Task Name", validators=[DataRequired()])
    description = TextAreaField("Task Description")
    attachment = FileField("Task Attachment (Optional)")
    status = SelectField("Status", choices=[
        ('To Do', 'To Do'),
        ('In Progress', 'In Progress'),
        ('Blocked', 'Blocked'),
        ('Completed', 'Completed')
    ])
    comment = TextAreaField("Comment (Optional)")
    submit = SubmitField("Save Task")