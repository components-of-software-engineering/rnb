from datetime import date

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from blueprints.annotations.roles_required import roles_required
from models.verifications_register import VerificationsRegisterModel
from connection import PostgresConnection

verifications_register_model = VerificationsRegisterModel(PostgresConnection().get_connection())

verifications_register = Blueprint('verifications_register', __name__)

@verifications_register.route('/create', methods=['POST'])
@jwt_required
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
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
@jwt_required
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
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
@jwt_required
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = verifications_register_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"verifications_registers": returned_data}), 200

@verifications_register.route('/delete', methods=['POST'])
@jwt_required
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
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


@verifications_register.route('/delete_all', methods=['POST'])
@jwt_required
def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        verifications_register_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "verifications was deleted"}), 201

@verifications_register.route('/update', methods=['POST'])
@jwt_required
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
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
@jwt_required
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = verifications_register_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"verifications_register_amount": returned_data}), 200

@verifications_register.route('/generate', methods=['POST'])
@jwt_required
def generate():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:

        num = request.json['number']
        returned_data = verifications_register_model.generate_data(num)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "verifications_register added"}), 200