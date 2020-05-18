from datetime import date

from flask import Blueprint, request, jsonify

from models.journal_actions import JournalActionsModel
from connection import PostgresConnection

journal_actions_model = JournalActionsModel(PostgresConnection().get_connection())

journal_actions = Blueprint('journal_actions', __name__)


@journal_actions.route('/create', methods=['POST'])
def create():
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
def get():
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
def get_all():
    try:
        returned_data = journal_actions_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"journals_actions": returned_data}), 200


@journal_actions.route('/delete', methods=['POST'])
def delete():
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


@journal_actions.route('/update', methods=['POST'])
def update():
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
def amount():
    try:
        returned_data = journal_actions_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"journal_actions_amount": returned_data}), 200

