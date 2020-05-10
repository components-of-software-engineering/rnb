from flask import Flask, send_from_directory
from dotenv import load_dotenv, find_dotenv
from waitress import serve
import sys
import os

load_dotenv(find_dotenv())

app = Flask(__name__)
PORT = os.getenv("PORT")


@app.route('/<path:path>')
def serve_dist(path):
    return send_from_directory('dist', path)


@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('assets', path)


@app.route('favicon.ico')
def serve_assets(path):
    return send_from_directory('assets', 'favicon.ico')


@app.route('/api/v1/names/<name>')
def hello_name(name):
    return "Hello %s!" % name


@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')


if __name__ == '__main__':
    if len(sys.argv) == 2:
        if sys.argv[1] == "--dev":
            app.run(host='127.0.0.1', port=PORT)
        elif sys.argv[1] == "--prod":
            serve(app, host='0.0.0.0', port=PORT)
        else:
            print("Unknown argument")
            exit(1)
    else:
        print("Provide --dev or --prod argument")
        exit(1)
