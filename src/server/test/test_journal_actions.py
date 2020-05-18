
import unittest
import uuid
from datetime import date

from connection import PostgresConnection
from models.journal_actions import JournalActionsModel
from models.users import UsersModel
from test.random_data_generators import (random_int, random_string)

users_model = UsersModel(PostgresConnection().get_connection())
users_returned_data = {'id': 0}


class TestJournalActions(unittest.TestCase):
    def setUp(self):
        returned_data = users_model.create({
            "name": "name",
            "role": 1,
            "date_registration": date.today(),
            "username": random_string(),
            "pwd_hash": random_string(),
            "pwd_salt": uuid.uuid4().hex,
            "date_last_update": date.today(),
            "status": True
        })
        users_returned_data['id'] = returned_data['id']

    def test(self):
        journal_actions_model = JournalActionsModel(PostgresConnection().get_connection())
        journal_actions_amount = journal_actions_model.amount()[0]
        action_type = random_int()
        returned_data = journal_actions_model.create({
            "user_id": users_returned_data['id'],
            "action_date": date.today(),
            "action_type": action_type,
            "row_affected": 'row_affected',
            "old_value": 'old_value',
            "new_value": 'new_value'
        })
        assert (journal_actions_amount + 1 == journal_actions_model.amount()[0])

        journal_actions = journal_actions_model.read({'id': returned_data['id']})
        assert (journal_actions['action_type'] == action_type)
        new_action_type = random_int()
        journal_actions_model.update({"action_type": new_action_type}, {'id': returned_data['id']})
        journal_actions = journal_actions_model.read({'id': returned_data['id']})
        assert (journal_actions['action_type'] == new_action_type)

        journal_actions_model.delete({'id': returned_data['id']})
        assert (journal_actions_model.read({'id': returned_data['id']}) is None)

    def tearDown(self):
        users_model.delete({'id': users_returned_data['id']})
