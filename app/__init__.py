from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS  # ✅ Needed for React

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    
    # ✅ Basic config
    app.config['SECRET_KEY'] = 'your-secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # ✅ Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    CORS(app, supports_credentials=True)  # ✅ Allow cross-origin for React

    login_manager.login_view = 'main.login'  # ✅ Required for @login_required

    # ✅ User loader
    @login_manager.user_loader
    def load_user(user_id):
        from .models import User
        return User.query.get(int(user_id))

    # ✅ Register blueprint (API routes)
    from .routes import main
    app.register_blueprint(main)

    return app
