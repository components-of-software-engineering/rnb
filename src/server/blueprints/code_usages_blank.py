from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from blueprints.annotations.roles_required import roles_required
from models.code_usages_blank import CodeUsagesBlankModel
from connection import PostgresConnection

code_usages_blank_model = CodeUsagesBlankModel(PostgresConnection().get_connection())

code_usages_blank = Blueprint('code_usages_blank', __name__)

@jwt_required
@code_usages_blank.route('/create', methods=['POST'])
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = code_usages_blank_model.create({
            "code": request_json['code'],
            "text_representation": request_json['text_representation']
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Code of blank's usages was added"}), 201

@jwt_required
@code_usages_blank.route('/get', methods=['POST'])
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    code = request.json['code']
    try:
        returned_data = code_usages_blank_model.read({
            "code": code
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank": returned_data}), 200

@jwt_required
@code_usages_blank.route('/get_all', methods=['POST'])
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = code_usages_blank_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"codes_usages_blank": returned_data}), 200

@jwt_required
@code_usages_blank.route('/delete', methods=['POST'])
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    code = request.json['code']
    try:
        code_usages_blank_model.delete({
            "code": code
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Code of blank's usages was deleted"}), 201


@jwt_required
@code_usages_blank.route('/delete_all', methods=['POST'])
def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        code_usages_blank_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Codes of blank's usages was deleted"}), 201


@jwt_required
@code_usages_blank.route('/update', methods=['POST'])
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        code_usages_blank_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Code of blank's usages was updated"}), 201

@jwt_required
@code_usages_blank.route('/amount', methods=['POST'])
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = code_usages_blank_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank_amount": returned_data}), 200

