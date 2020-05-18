from datetime import date

from flask import Blueprint, request, jsonify

from models.blank import BlankModel
from connection import PostgresConnection

blank_model = BlankModel(PostgresConnection().get_connection())

blank = Blueprint('blank', __name__)


@blank.route('/create', methods=['POST'])
def create():
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


@blank.route('/get', methods=['POST'])
def get():
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


@blank.route('/getfu', methods=['POST'])
def get_for_utilizer():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    num = request.json['num']
    series = request.json['series']
    resp = {}
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


@blank.route('/get_all', methods=['POST'])
def get_all():
    try:
        returned_data = blank_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks": returned_data}), 200


@blank.route('/delete', methods=['POST'])
def delete():
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


@blank.route('/update', methods=['POST'])
def update():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    try:
        blank_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was updated"}), 201


@blank.route('/amount', methods=['POST'])
def amount():
    try:
        returned_data = blank_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks_amount": returned_data}), 200
