from datetime import date

from models import BaseModel
from models.code_usages_blank import CodeUsagesBlankModel
from random_data_generators import *


class UsagesRegisterModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO usages_register (num_blank, series_blank, date_usage, code_usage, additional_info)"
                            "VALUES ( %(num_blank)s, %(series_blank)s, %(date_usage)s, %(code_usage)s,"
                            "%(additional_info)s) RETURNING id",
            "select_query": "SELECT * FROM usages_register WHERE id = %(id)s",
            "update_query": "UPDATE usages_register SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM usages_register WHERE id = %(id)s",
            "delete_all_query": "TRUNCATE TABLE usages_register CASCADE",
            "select_all_query": "SELECT * FROM usages_register ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM usages_register",
        }

        columns = ["id", "num_blank", "series_blank", "date_usage", "code_usage", "additional_info"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)

    def generate_data(self, num: int):
        try:
            auxiliary_model = CodeUsagesBlankModel(self._connection)
            auxiliary_list = auxiliary_model.read_all()
            length = len(auxiliary_list)
            for i in range(0, num):
                self.create({
                    "num_blank": random_int_from_zero_to_num(),
                    "series_blank": random_string(2),
                    "date_usage": date.today(),
                    "code_usage":  auxiliary_list[random_int_from_zero_to_num(length)]['code'],
                    "additional_info": random_string()
                })

        except Exception as e:
            return str(e)