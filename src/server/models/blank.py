from datetime import date

from models import BaseModel
from models.notarius import NotariusModel
from random_data_generators import *


class BlankModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO blank (num, series, notarius_id, date_receiving) VALUES (%(num)s,"
                            "%(series)s, %(notarius_id)s, %(date_receiving)s) RETURNING num, series",
            "select_query": "SELECT * FROM blank WHERE num = %(num)s AND series = %(series)s",
            "update_query": "UPDATE blank SET {} WHERE num = %(num)s AND series = %(series)s",
            "delete_query": "DELETE FROM blank WHERE num = %(num)s AND series = %(series)s",
            "delete_all_query": "TRUNCATE TABLE blank CASCADE",
            "select_all_query": "SELECT * FROM blank ORDER BY num",
            "count_query": "SELECT COUNT(*) FROM blank",
        }
        columns = ["num", "series", "notarius_id", "date_receiving"]
        primary_key_names = ["num", "series"]
        super().__init__(connection, columns, primary_key_names, **queries)

    def create(self, item: dict):
        user_id = item["user_id"]
        num = item["num"]
        series = item["series"]
        del item["user_id"]
        res = super().create(item)
        super().custom_query("UPDATE blank SET user_id = %s WHERE num = %s AND series = '%s'" % (user_id, num, series), False)
        return res

    def generate_data(self, num: int):
        try:
            auxiliary_model = NotariusModel(self._connection)
            auxiliary_list = auxiliary_model.read_all()
            length = len(auxiliary_list)
            for i in range(0, num):
                self.create({
                    "num": random_int_from_zero_to_num(),
                    "series": random_string(2),
                    "notarius_id": auxiliary_list[random_int_from_zero_to_num(length)]['id'],
                    "date_receiving": date.today(),
                })

        except Exception as e:
            return str(e)
