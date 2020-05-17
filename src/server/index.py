import sys
import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv, find_dotenv
from waitress import serve
from controller import Controller

from blueprints.auth import auth
from config import config_jwt

from extensions import jwt


load_dotenv(find_dotenv())
PORT = os.getenv("PORT")

app = Flask(__name__)
app.config['JWT_TOKEN_LOCATION'] = config_jwt['JWT_TOKEN_LOCATION']
app.config['JWT_REFRESH_COOKIE_PATH'] = config_jwt['JWT_REFRESH_COOKIE_PATH']
app.config['JWT_SECRET_KEY'] = config_jwt['JWT_SECRET_KEY']

jwt.init_app(app)

app.register_blueprint(auth, url_prefix='/auth')


@app.route('/dist/<path:path>')
def serve_dist(path):
    return send_from_directory('dist', path)


@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('assets', path)


@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('assets', 'favicon.ico')


@app.route('/api/v1/names/<name>')
def hello_name(name):
    return "Hello %s!" % name


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory('dist', 'index.html')


def create_db_connection():
    Controller()


if __name__ == '__main__':
    if len(sys.argv) == 2:
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
