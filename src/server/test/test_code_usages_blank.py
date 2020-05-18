
import unittest
from datetime import date

from connection import PostgresConnection
from models.code_usages_blank import CodeUsagesBlankModel
from test.random_data_generators import (random_int, random_string)


class TestCodeUsagesBlank(unittest.TestCase):
    def test(self):
        code_usages_blank_model = CodeUsagesBlankModel(PostgresConnection().get_connection())
        code_usages_blank_amount = code_usages_blank_model.amount()[0]
        code = random_int()
        returned_data = code_usages_blank_model.create({
            "code": code,
            "text_representation": 'text_representation'
        })
        assert (code_usages_blank_amount + 1 == code_usages_blank_model.amount()[0])

        code_register = code_usages_blank_model.read({'code': code})
        assert (code_register['text_representation'] == 'text_representation')
        new_code = random_int()
        code_usages_blank_model.update({"code": new_code}, {'code': code})
        code_register = code_usages_blank_model.read({'code': new_code})
        assert (code_register['code'] == new_code)

        code_usages_blank_model.delete({'code': new_code})
        assert (code_usages_blank_model.read({'code': new_code}) is None)
