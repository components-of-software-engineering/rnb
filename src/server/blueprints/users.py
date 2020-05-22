import uuid
import hashlib
from datetime import date

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from blueprints.annotations.roles_required import roles_required
from models.users import UsersModel
from connection import PostgresConnection

users_model = UsersModel(PostgresConnection().get_connection())

users = Blueprint('users', __name__)

@users.route('/create', methods=['POST'])
@jwt_required
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = users_model.create({

            "name": request_json["name"],
            "role": request_json["role"],
            "date_registration": date.today(),
            "username": request_json["username"],
            "pwd_hash": request_json["pwd_hash"],
            "pwd_salt": uuid.uuid4().hex,
            "date_last_update": date.today(),
            "status": True
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "user was added"}), 201

@users.route('/get', methods=['POST'])
@jwt_required
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json['username']
    try:
        returned_data = users_model.read({
            "username": username
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank": returned_data}), 200

@users.route('/get_all', methods=['POST'])
@jwt_required
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = users_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

    return jsonify({"usages_registers": returned_data}), 200

@users.route('/delete', methods=['POST'])
@jwt_required
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        users_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "user was deleted"}), 201


@users.route('/delete_all', methods=['POST'])
@jwt_required
def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        users_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "users was deleted"}), 201

@users.route('/update', methods=['POST'])
@jwt_required
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    arguments_to_update["date_last_update"] = str(date.today())
    if "password" in arguments_to_update:
        arguments_to_update["pwd_salt"] = uuid.uuid4().hex
        arguments_to_update["pwd_hash"] = hashlib.sha512((arguments_to_update["password"] + arguments_to_update["pwd_salt"]).encode('utf-8')).hexdigest()
        
        if arguments_to_update["check_pass_hash"] != hashlib.sha512((arguments_to_update["old_password"] + arguments_to_update["check_salt_hash"]).encode('utf-8')).hexdigest():
            return jsonify({"msg": "invalid old password"}), 406

        del arguments_to_update["password"]
        del arguments_to_update["old_password"]
        del arguments_to_update["confirm_password"]
        del arguments_to_update["check_pass_hash"]
        del arguments_to_update["check_salt_hash"]
    try:
        users_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of register was updated"}), 201

@users.route('/amount', methods=['POST'])
@jwt_required
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = users_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers_amount": returned_data}), 200

