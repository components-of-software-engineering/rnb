from datetime import date

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from blueprints.annotations.roles_required import roles_required
from models.blank import BlankModel
from connection import PostgresConnection

blank_model = BlankModel(PostgresConnection().get_connection())

blank = Blueprint('blank', __name__)


@jwt_required
@blank.route('/create', methods=['POST'])
def create():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    request_json = request.json
    try:
        returned_data = blank_model.create({
            "num": request_json["num"],
            "series": request_json["series"],
            "notarius_id": request_json["notarius_id"],
            "date_receiving": date.today(),
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was added"}), 201


@jwt_required
@blank.route('/get', methods=['POST'])
def get():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    num = request.json['num']
    series = request.json['series']
    try:
        returned_data = blank_model.read({
            "num": num,
            "series": series
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blank": returned_data}), 200


@jwt_required
@blank.route('/getfu', methods=['POST'])
def get_for_utilizer():
    if roles_required(["utilizer"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    num = request.json['num']
    series = request.json['series']
    try:
        returned_data = blank_model.read({
            "num": num,
            "series": series
        })

        from models.usages_register import UsagesRegisterModel
        usages_register_model = UsagesRegisterModel(PostgresConnection().get_connection())
        usages_register = usages_register_model.custom_query("SELECT * FROM usages_register "
                                                             "WHERE num_blank = %s "
                                                             "AND series_blank = \'%s\'" % (num, series))

        from models.code_usages_blank import CodeUsagesBlankModel
        code_usages_blank_model = CodeUsagesBlankModel(PostgresConnection().get_connection())
        code_usages_blank = code_usages_blank_model.custom_query("SELECT * FROM code_usages_blank "
                                                                 "WHERE code = %s" % (usages_register['code_usage']))


    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({
        "statusCode": usages_register['code_usage'],
        "statusPhrase": code_usages_blank['text_representation'],
        "dateUsing": usages_register['date_usage']
    }), 200

@jwt_required
@blank.route('/get_all', methods=['POST'])
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = blank_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks": returned_data}), 200

@jwt_required
@blank.route('/delete', methods=['POST'])
def delete():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    num = request.json['num']
    series = request.json['series']
    try:
        blank_model.delete({
            "num": num,
            "series": series
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was deleted"}), 201


@jwt_required
@blank.route('/delete_all', methods=['POST'])

def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        blank_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blanks was deleted"}), 201


@jwt_required
@blank.route('/update', methods=['POST'])
def update():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        blank_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was updated"}), 201

@jwt_required
@blank.route('/amount', methods=['POST'])
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = blank_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks_amount": returned_data}), 200
