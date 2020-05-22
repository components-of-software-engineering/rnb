import sys
import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv, find_dotenv
from waitress import serve

from blueprints.auth import auth
from blueprints.blank import blank
from blueprints.code_usages_blank import code_usages_blank
from blueprints.journal_actions import journal_actions
from blueprints.notarius import notarius
from blueprints.usages_register import usages_register
from blueprints.users import users
from blueprints.verifications_register import verifications_register

from config import config_jwt
from controller import Controller

from extensions import jwt


load_dotenv(find_dotenv())
PORT = os.getenv("PORT")

app = Flask(__name__)
app.config['JWT_TOKEN_LOCATION'] = config_jwt['JWT_TOKEN_LOCATION']
app.config['JWT_REFRESH_COOKIE_PATH'] = config_jwt['JWT_REFRESH_COOKIE_PATH']
app.config['JWT_SECRET_KEY'] = config_jwt['JWT_SECRET_KEY']

jwt.init_app(app)

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(blank, url_prefix='/blank')
app.register_blueprint(code_usages_blank, url_prefix='/code_usages_blank')
app.register_blueprint(journal_actions, url_prefix='/journal_actions')
app.register_blueprint(notarius, url_prefix='/notarius')
app.register_blueprint(usages_register, url_prefix='/usages_register')
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(verifications_register, url_prefix='/verifications_register')

@app.route('/dist/<path:path>')
def serve_dist(path):
    return send_from_directory('dist', path)


@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('assets', path)


@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('assets', 'favicon.ico')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory('dist', 'index.html')


def create_db_connection():
    Controller()


if __name__ == '__main__':
    if len(sys.argv) == 2:
        create_db_connection()
        if sys.argv[1] == "--dev":
            app.run(debug=True, host='0.0.0.0', port=PORT)
        elif sys.argv[1] == "--prod":
            serve(app, host='0.0.0.0', port=PORT)
        else:
            print("Unknown argument")
            exit(1)
    else:
        print("Provide --dev or --prod argument")
        exit(1)
