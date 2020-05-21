
import unittest
from datetime import date

from connection import PostgresConnection
from models.usages_register import UsagesRegisterModel
from models.code_usages_blank import CodeUsagesBlankModel
from random_data_generators import (random_int, random_string)

auxiliary_model = CodeUsagesBlankModel(PostgresConnection().get_connection())
auxiliary_data = {'code': 0}



class TestUsagesRegisterModel(unittest.TestCase):

    def setUp(self):
        returned_data = auxiliary_model.create({
            "code": random_int(100),
            "text_representation": 'text_representation'
        })
        auxiliary_data['code'] = returned_data['code']

    def test(self):
        usages_register_model = UsagesRegisterModel(PostgresConnection().get_connection())
        usages_register_amount = usages_register_model.amount()[0]
        num_blank = random_int()
        returned_data = usages_register_model.create({
            "num_blank": num_blank,
            "series_blank": "series_blank",
            "date_usage": date.today(),
            "code_usage": auxiliary_data['code'],
            "additional_info": "additional_info"
        })
        assert (usages_register_amount + 1 == usages_register_model.amount()[0])

        usages_register = usages_register_model.read({'id': returned_data['id']})
        assert (usages_register['num_blank'] == num_blank)
        new_num_blank = random_int()
        usages_register_model.update({"num_blank": new_num_blank}, {'id': returned_data['id']})
        usages_register = usages_register_model.read({'id': returned_data['id']})
        assert (usages_register['num_blank'] == new_num_blank)

        usages_register_model.delete({'id': returned_data['id']})
        assert (usages_register_model.read({'id': returned_data['id']}) is None)
