
import unittest
from datetime import date

from connection import PostgresConnection
from models.usages_register import UsagesRegisterModel
from models.notarius import NotariusModel
from test.random_data_generators import (random_int, random_string)


class TestUsagesRegisterModel(unittest.TestCase):
    def test(self):
        usages_register_model = UsagesRegisterModel(PostgresConnection().get_connection())
        usages_register_amount = usages_register_model.amount()[0]
        num_blank = random_int()
        returned_data = usages_register_model.create({
            "num_blank": num_blank,
            "series_blank": "series_blank",
            "date_usage": date.today(),
            "code_usage": 1,
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
