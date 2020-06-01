from datetime import date
from models.users import UsersModel
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from blueprints.annotations.roles_required import roles_required
from models.blank import BlankModel
from connection import PostgresConnection
users_model = UsersModel(PostgresConnection().get_connection())
blank_model = BlankModel(PostgresConnection().get_connection())

blank = Blueprint('blank', __name__)


@blank.route('/create', methods=['POST'])
@jwt_required
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
            "date_receiving": request_json["date_receiving"],
            "is_active":request_json["is_active"],
            "tax_number":request_json["tax_number"],
            "user_id": request_json.get("user_id", None),
            "fullname": request_json["fullname"],
            "type" : request_json["type"] ,
            "additional_info": request_json["additional_info"]
        })
    except Exception as e:
        print(str(e))
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was added"}), 201


@blank.route('/get', methods=['POST'])
def get():
    num = request.json['num']
    series = request.json['series']
    try:
        returned_data = blank_model.read({
            "num": num,
            "series": series
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400 
    if  returned_data:
        user_res = users_model.custom_query("SELECT * FROM users "
                                                         "WHERE id = %s "'' % (returned_data["notarius_id"]))
        return jsonify({"blank": returned_data}, {"not_name":user_res['name']}), 200
    return jsonify({"blank": returned_data}, {"not_name":'null'}), 200
    


@blank.route('/getfu', methods=['POST'])
@jwt_required
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

@blank.route('/get_all', methods=['POST'])
@jwt_required
def get_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:
        returned_data = blank_model.read_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks": returned_data}), 200

@blank.route('/delete', methods=['POST'])
@jwt_required
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


@blank.route('/delete_all', methods=['POST'])
@jwt_required

def delete_all():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400

    try:
        blank_model.delete_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blanks was deleted"}), 201


@blank.route('/update', methods=['POST'])
def update():
 
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    arguments_to_update = request.json['arguments_to_update']
    primary_keys = request.json['primary_keys']
    print(primary_keys)
    print(arguments_to_update)
    try:
        blank_model.update(arguments_to_update, primary_keys)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "Blank was updated"}), 201

@blank.route('/amount', methods=['POST'])
@jwt_required
def amount():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    try:
        returned_data = blank_model.amount()
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"blanks_amount": returned_data}), 200


@blank.route('/generate', methods=['POST'])
@jwt_required
def generate():
    if roles_required(["admin", "registrar"]) == 400:
        return jsonify({"msg": "no access"}), 400
    try:

        num = request.json['number']
        returned_data = blank_model.generate_data(num)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": "blanks added"}), 200
