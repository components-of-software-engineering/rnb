import uuid
from datetime import date

from flask import Blueprint, request, jsonify

from models.users import UsersModel
from connection import PostgresConnection

users_model = UsersModel(PostgresConnection().get_connection())

users = Blueprint('users', __name__)


@users.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        users_model.create({
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
def get():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        returned_data = users_model.read({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank": returned_data}), 200


@users.route('/get_all', methods=['POST'])
def get_all():
    try:
        returned_data = users_model.read_all()
    except Exception as e:
        print(str(e))
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers": returned_data}), 200


@users.route('/delete', methods=['POST'])
def delete():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        users_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of register was deleted"}), 201


@users.route('/update', methods=['POST'])
def update():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        users_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of register was updated"}), 201


@users.route('/amount', methods=['POST'])
def amount():
    try:
        returned_data = users_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers_amount": returned_data}), 200

