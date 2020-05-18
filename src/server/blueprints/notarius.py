from datetime import date

from flask import Blueprint, request, jsonify

from models.notarius import NotariusModel
from connection import PostgresConnection

notarius_model = NotariusModel(PostgresConnection().get_connection())

notarius = Blueprint('notarius', __name__)


@notarius.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = notarius_model.create({
            "type": request_json['type'],
            "status": request_json['status'],
            "date_status_update": date.today(),
            "num_certificate": request_json['num_certificate'],
            "num_card": request_json['num_card'],
            "name": request_json['name'],
            "name_organization": request_json['name_organization'],
            "region": request_json['region'],
            "contacts": request_json['contacts'],
            "notarius_region": request_json['notarius_region'],
            "additional_info": request_json['additional_info'],
            "date_issue_certificate": request_json['date_issue_certificate'],
            "date_issue_card": request_json['date_issue_card'],
            "date_reg_region": date.today(),
            "location": request_json['location']
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Notarius was added"}), 201


@notarius.route('/get', methods=['POST'])
def get():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        returned_data = notarius_model.read({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"notarius": returned_data}), 200


@notarius.route('/get_all', methods=['GET'])
def get_all():
    try:
        returned_data = notarius_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"notaries": returned_data}), 200


@notarius.route('/delete', methods=['POST'])
def delete():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    id = request.json['id']
    try:
        notarius_model.delete({
            "id": id
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "notarius was deleted"}), 201


@notarius.route('/update', methods=['POST'])
def update():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        notarius_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was updated"}), 201


@notarius.route('/amount', methods=['GET'])
def amount():
    try:
        returned_data = notarius_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"notaries_amount": returned_data}), 200

