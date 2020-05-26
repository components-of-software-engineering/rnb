from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from datetime import date

from blueprints.annotations.roles_required import roles_required
from models.usages_register import UsagesRegisterModel
from connection import PostgresConnection

usages_register_model = UsagesRegisterModel(PostgresConnection().get_connection())

usages_register = Blueprint('usages_register', __name__)

@usages_register.route('/create', methods=['POST'])
@jwt_required
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = usages_register_model.create({
            "num_blank": request_json.get("num", request_json.get("num_blank", None)),
            "series_blank": request_json.get("series", request_json.get("series_blank", None)),
            "date_usage": request_json.get("date_usage", date.today()),
            "code_usage": request_json["code_usage"],
            "additional_info": request_json["additional_info"]
        })
    except Exception as e:
        print(e)
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "register's usages was added"}), 201

@usages_register.route('/get', methods=['POST'])
@jwt_required
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        returned_data = usages_register_model.read({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank": returned_data}), 200

@usages_register.route('/get_all', methods=['POST'])
@jwt_required
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = usages_register_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers": returned_data}), 200

@usages_register.route('/delete', methods=['POST'])
@jwt_required
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        usages_register_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of register was deleted"}), 201


@usages_register.route('/delete_all', methods=['POST'])
@jwt_required
def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        usages_register_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of registers was deleted"}), 201

@usages_register.route('/update', methods=['POST'])
@jwt_required
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        usages_register_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages of register was updated"}), 201

@usages_register.route('/amount', methods=['POST'])
@jwt_required
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = usages_register_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers_amount": returned_data}), 200

@usages_register.route('/generate', methods=['POST'])
@jwt_required
def generate():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:

        num = request.json['number']
        returned_data = usages_register_model.generate_data(num)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "usages_registers added"}), 200