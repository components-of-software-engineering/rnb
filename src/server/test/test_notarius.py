
import unittest
from datetime import date

from connection import PostgresConnection
from models.notarius import NotariusModel
from random_data_generators import (random_int, random_string)


class TestNotarius(unittest.TestCase):
    def test(self):
        notarius_model = NotariusModel(PostgresConnection().get_connection())
        notarius_amount = notarius_model.amount()[0]
        num_card = random_int()
        returned_data = notarius_model.create({
            "type": False,
            "status": 'status',
            "date_status_update": date.today(),
            "num_certificate": 'num_certificate',
            "num_card": num_card,
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
        assert (notarius_amount + 1 == notarius_model.amount()[0])

        notarius = notarius_model.read({'id': returned_data['id']})
        assert (notarius['num_card'] == num_card)
        new_num_card = random_int()
        notarius_model.update({"num_card": new_num_card}, {'id': returned_data['id']})
        notarius = notarius_model.read({'id': returned_data['id']})
        assert (notarius['num_card'] == new_num_card)

        notarius_model.delete({'id': returned_data['id']})
        assert (notarius_model.read({'id': returned_data['id']}) is None)

