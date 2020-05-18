from flask import Blueprint, request, jsonify

from models.code_usages_blank import CodeUsagesBlankModel
from connection import PostgresConnection

code_usages_blank_model = CodeUsagesBlankModel(PostgresConnection().get_connection())

code_usages_blank = Blueprint('code_usages_blank', __name__)


@code_usages_blank.route('/create', methods=['POST'])
def create():
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


@code_usages_blank.route('/get', methods=['POST'])
def get():
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


@code_usages_blank.route('/get_all', methods=['GET'])
def get_all():
    try:
        returned_data = code_usages_blank_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"codes_usages_blank": returned_data}), 200


@code_usages_blank.route('/delete', methods=['POST'])
def delete():
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


@code_usages_blank.route('/update', methods=['POST'])
def update():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        code_usages_blank_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Code of blank's usages was updated"}), 201


@code_usages_blank.route('/amount', methods=['GET'])
def amount():
    try:
        returned_data = code_usages_blank_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"code_usages_blank_amount": returned_data}), 200

