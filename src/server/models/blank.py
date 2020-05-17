from models import BaseModel


class BlankModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO blank (num, series, notarius_id, date_receiving) VALUES (%(num)s,"
                            "%(series)s, %(notarius_id)s, %(date_receiving)s) RETURNING num, series",
            "select_query": "SELECT * FROM blank WHERE num = %(num)s, series = %(series)s",
            "update_query": "UPDATE blank SET {} WHERE num = %(num)s, series = %(series)s",
            "delete_query": "DELETE FROM blank WHERE num = %(num)s, series = %(series)s",
            "select_all_query": "SELECT * FROM blank ORDER BY num",
            "count_query": "SELECT COUNT(*) FROM blank",
        }
        columns = ["num", "series", "notarius_id", "date_receiving"]
        primary_key_name = ["num", "series"]
        super().__init__(connection, columns, primary_key_name, **queries)