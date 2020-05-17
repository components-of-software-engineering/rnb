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
from config import other_configs
from connection import PostgresConnection
from extensions import jwt
from blueprints.annotations.roles_required import roles_required


user_model = UsersModel(PostgresConnection().get_connection())

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    role = request.json.get('role', None)
    date_registration = date.today()
    username = request.json.get('username', "")
    password = request.json.get('password', "")
    date_last_update = date_registration
    salt = uuid.uuid4().hex

    try:
        returned_data = user_model.create({
            "name": name,
            "role": role,
            "date_registration": date_registration,
            "username": username,
            "pwd_hash": password,
            "pwd_salt": salt,
            "date_last_update": date_last_update,
            "status": True
        })
        print(returned_data)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": f"user  was created"}), 201


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

    row = user_model.read({"username": username})
    password_with_salt = password + row["pwd_salt"]
    if row["pwd_hash"] == hashlib.sha512(password_with_salt.encode('utf-8')).hexdigest():

        access_token = create_access_token(identity=row)
        refresh_token = create_refresh_token(identity=row)
        resp = jsonify({
            'token': access_token,
            'user': row
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
# @roles_required(["admin"])
def protected():
    if roles_required(["admin"]) == 400:
        return jsonify({"msg": "no access"}), 400

    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@auth.route('/me', methods=['GET'])
@jwt_required
def user_info():
    current_user = get_jwt_identity()
    return jsonify({'user': current_user}), 200
