
import unittest
from datetime import date

from connection import PostgresConnection
from models.verifications_register import VerificationsRegisterModel
from models.notarius import NotariusModel
from test.random_data_generators import (random_int, random_string)

notarius_model = NotariusModel(PostgresConnection().get_connection())
notary_returned_data = {'id': 0}


class TestVerificationsRegister(unittest.TestCase):
    def setUp(self):
        returned_data = notarius_model.create({
            "type": False,
            "status": 'status',
            "date_status_update": date.today(),
            "num_certificate": 'num_certificate',
            "num_card": 1,
            "name": 'name',
            "name_organization": 'name_organization',
            "region": 'region',
            "contacts": 'contacts',
            "notarius_region": 'notarius_region',
            "additional_info": 'additional_info',
            "date_issue_certificate": date.today(),
            "date_issue_card": date.today(),
            "date_reg_region": date.today(),
            "location": 'location'
        })
        notary_returned_data['id'] = returned_data['id']

    def test(self):
        verifications_register_model = VerificationsRegisterModel(PostgresConnection().get_connection())
        verifications_register_amount = verifications_register_model.amount()[0]
        num_blank = random_int()
        returned_data = verifications_register_model.create({
            "num_blank": num_blank,
            "series_blank": random_string(),
            "user_id": notary_returned_data['id'],
            "date_verification": date.today()
        })
        assert (verifications_register_amount + 1 == verifications_register_model.amount()[0])

        verifications_register = verifications_register_model.read({'id': returned_data['id']})
        assert (verifications_register['num_blank'] == num_blank)
        new_num_blank = random_int()
        verifications_register_model.update({"num_blank": new_num_blank}, {'id': returned_data['id']})
        verifications_register = verifications_register_model.read({'id': returned_data['id']})
        assert (verifications_register['num_blank'] == new_num_blank)

        verifications_register_model.delete({'id': returned_data['id']})
        assert (verifications_register_model.read({'id': returned_data['id']}) is None)

    def tearDown(self):
        notarius_model.delete({'id': notary_returned_data['id']})
