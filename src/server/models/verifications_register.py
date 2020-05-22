from datetime import date

from models import BaseModel
from models.notarius import NotariusModel
from random_data_generators import *


class VerificationsRegisterModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO verifications_register (num_blank, series_blank, user_id, date_verification) VALUES"
                            "( %(num_blank)s, %(series_blank)s, %(user_id)s, %(date_verification)s) RETURNING id",
            "select_query": "SELECT * FROM verifications_register WHERE id = %(id)s",
            "update_query": "UPDATE verifications_register SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM verifications_register WHERE id = %(id)s",
            "delete_all_query": "TRUNCATE TABLE verifications_register CASCADE",
            "select_all_query": "SELECT * FROM verifications_register ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM verifications_register",
        }

        columns = ["id", "num_blank", "series_blank", "user_id", "date_verification"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)


    def generate_data(self, num: int):
        try:
            auxiliary_model = NotariusModel(self._connection)
            auxiliary_list = auxiliary_model.read_all()
            length = len(auxiliary_list)
            for i in range(0, num):
                self.create({
                    "num_blank": random_int_from_zero_to_num(),
                    "series_blank": random_string(),
                    "user_id": auxiliary_list[random_int_from_zero_to_num(length)]['id'],
                    "date_verification": date.today()
                })

        except Exception as e:
            return str(e)