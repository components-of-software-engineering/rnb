from abc import ABC
from datetime import date

from models import BaseModel
from random_data_generators import *


class CodeUsagesBlankModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO code_usages_blank (code, text_representation) VALUES (%(code)s,"
                            "%(text_representation)s) RETURNING code",
            "select_query": "SELECT * FROM code_usages_blank WHERE code = %(code)s",
            "update_query": "UPDATE code_usages_blank SET {} WHERE code = %(code)s",
            "delete_query": "DELETE FROM code_usages_blank WHERE code = %(code)s",
            "delete_all_query": "TRUNCATE TABLE code_usages_blank CASCADE",
            "select_all_query": "SELECT * FROM code_usages_blank ORDER BY code",
            "count_query": "SELECT COUNT(*) FROM code_usages_blank",
        }

        columns = ["code", "text_representation"]
        primary_key_names = ["code"]
        super().__init__(connection, columns, primary_key_names, **queries)

    def generate_data(self, num: int):
        try:
            for i in range(0, num):
                self.create({
                    "code": random_int_from_zero_to_num(21),
                    "text_representation": random_string
                })

        except Exception as e:
            return str(e)