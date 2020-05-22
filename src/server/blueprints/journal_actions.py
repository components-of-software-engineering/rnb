from datetime import date

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from blueprints.annotations.roles_required import roles_required
from models.journal_actions import JournalActionsModel
from connection import PostgresConnection

journal_actions_model = JournalActionsModel(PostgresConnection().get_connection())

journal_actions = Blueprint('journal_actions', __name__)

@journal_actions.route('/create', methods=['POST'])
@jwt_required
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = journal_actions_model.create({
            "user_id": request_json['user_id'],
            "action_date": request_json['action_date'],
            "action_type": request_json['action_type'],
            "row_affected": request_json['row_affected'],
            "old_value": request_json['old_value'],
            "new_value": request_json['new_value']
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "journal action was added"}), 201

@journal_actions.route('/get', methods=['POST'])
@jwt_required
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        returned_data = journal_actions_model.read({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"journal_actions": returned_data}), 200

@journal_actions.route('/get_all', methods=['POST'])
@jwt_required
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = journal_actions_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"journals_actions": returned_data}), 200

@journal_actions.route('/delete', methods=['POST'])
@jwt_required
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        journal_actions_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "journal action was deleted"}), 201


@journal_actions.route('/delete_all', methods=['POST'])
@jwt_required
def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        journal_actions_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "journal actions was deleted"}), 201


@journal_actions.route('/update', methods=['POST'])
@jwt_required
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        journal_actions_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "journal action was updated"}), 201

@journal_actions.route('/amount', methods=['POST'])
@jwt_required
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = journal_actions_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"journal_actions_amount": returned_data}), 200

@journal_actions.route('/generate', methods=['POST'])
@jwt_required
def generate():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:

        num = request.json['number']
        returned_data = journal_actions_model.generate_data(num)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "journal_actions added"}), 200