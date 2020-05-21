
import unittest
import uuid
from datetime import date

from connection import PostgresConnection
from models.users import UsersModel
from models.notarius import NotariusModel
from random_data_generators import (random_int, random_string)

notarius_model = NotariusModel(PostgresConnection().get_connection())
notary_returned_data = {'id': 0}


class TestUsers(unittest.TestCase):
    def test(self):
        users_model = UsersModel(PostgresConnection().get_connection())
        users_amount = users_model.amount()[0]
        username = random_string()
        password = random_string()
        returned_data = users_model.create({
            "name": "name",
            "role": 1,
            "date_registration": date.today(),
            "username": username,
            "pwd_hash": password,
            "pwd_salt": uuid.uuid4().hex,
            "date_last_update": date.today(),
            "status": True
        })
        assert (users_amount + 1 == users_model.amount()[0])

        user = users_model.read({'username': username})
        assert (user['role'] == 1)
        new_username = random_string()
        users_model.update({"username": new_username}, {"id": returned_data['id']})
        user = users_model.read({"username": new_username})
        assert (user is not None)

        users_model.delete({"id": returned_data['id']})
        assert (users_model.read({"username": new_username}) is None)
