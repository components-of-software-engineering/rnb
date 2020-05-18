from flask import Blueprint, request, jsonify

from models.usages_register import UsagesRegisterModel
from connection import PostgresConnection

usages_register_model = UsagesRegisterModel(PostgresConnection().get_connection())

usages_register = Blueprint('usages_register', __name__)


@usages_register.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = usages_register_model.create({
            "num_blank": request_json["num_blank"],
            "series_blank": request_json["series_blank"],
            "date_usage": request_json["date_usage"],
            "code_usage": request_json["code_usage"],
            "additional_info": request_json["additional_info"]
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "register's usages was added"}), 201


@usages_register.route('/get', methods=['POST'])
def get():
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
def get_all():
    try:
        returned_data = usages_register_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers": returned_data}), 200


@usages_register.route('/delete', methods=['POST'])
def delete():
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


@usages_register.route('/update', methods=['POST'])
def update():
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
def amount():
    try:
        returned_data = usages_register_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"usages_registers_amount": returned_data}), 200

