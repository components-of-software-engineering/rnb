
import unittest
from datetime import date

from connection import PostgresConnection
from models.blank import BlankModel
from models.notarius import NotariusModel
from random_data_generators import (random_int, random_string)

notarius_model = NotariusModel(PostgresConnection().get_connection())
notary_returned_data = {'id': 0}


class TestBlank(unittest.TestCase):
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
        blank_model = BlankModel(PostgresConnection().get_connection())
        blank_amount = blank_model.amount()[0]
        num = random_int()
        series = random_string(2)
        returned_data = blank_model.create({
            "num": num,
            "series": series,
            "notarius_id": notary_returned_data['id'],
            "date_receiving": date.today(),
        })
        assert (blank_amount + 1 == blank_model.amount()[0])

        blank = blank_model.read({"num": num, "series": series})
        assert (blank['num'] == num)

        blank_model.delete({"num": num, "series": series})
        assert (blank_model.read({"num": num, "series": series}) is None)

    def tearDown(self):
        notarius_model.delete({'id': notary_returned_data['id']})
