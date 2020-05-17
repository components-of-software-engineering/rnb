import hashlib, uuid
import psycopg2

from datetime import date
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from flask import request, Blueprint, jsonify

from models.users import UsersModel
from config import config_db, other_configs

user = UsersModel(psycopg2.connect(**config_db))

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    role = request.json.get('role', None) #redo
    date_registration = date.today()
    username = request.json.get('username', "")
    password = request.json.get('password', "")
    date_last_update = date_registration
    salt = uuid.uuid4().hex

    try:
        user.create({"name": name, "role": role, "date_registration": date_registration, "username": username,
                     "pwd_hash": password, "pwd_salt": salt, "date_last_update": date_last_update,
                     "status": True})
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Registration success"}), 200


@auth.route('/login', methods=['POST'])
def login():
    print(get_jwt_identity())
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    row = user.read({"username": username})
    password_with_salt = password + row["pwd_salt"] 
    if row["pwd_hash"] == hashlib.sha512(password_with_salt.encode('utf-8')).hexdigest():

        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        resp = jsonify({
            'token': access_token,
            'uset': row
        })
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp, 200
    else:
        return jsonify({"msg": "Wrong password"}), 401


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200


@auth.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


@auth.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
