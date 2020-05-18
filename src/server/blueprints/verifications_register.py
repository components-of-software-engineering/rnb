from datetime import date

from flask import Blueprint, request, jsonify

from models.verifications_register import VerificationsRegisterModel
from connection import PostgresConnection

verifications_register_model = VerificationsRegisterModel(PostgresConnection().get_connection())

verifications_register = Blueprint('verifications_register', __name__)


@verifications_register.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = verifications_register_model.create({

            "num_blank": request_json['num_blank'],
            "series_blank": request_json['series_blank'],
            "user_id": request_json['user_id'],
            "date_verification": date.today()
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "verification was added"}), 201


@verifications_register.route('/get', methods=['POST'])
def get():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        returned_data = verifications_register_model.read({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"verifications_register": returned_data}), 200


@verifications_register.route('/get_all', methods=['POST'])
def get_all():
    try:
        returned_data = verifications_register_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"verifications_registers": returned_data}), 200


@verifications_register.route('/delete', methods=['POST'])
def delete():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        verifications_register_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "verification was deleted"}), 201


@verifications_register.route('/update', methods=['POST'])
def update():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        verifications_register_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "verification was updated"}), 201


@verifications_register.route('/amount', methods=['POST'])
def amount():
    try:
        returned_data = verifications_register_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"verifications_register_amount": returned_data}), 200

