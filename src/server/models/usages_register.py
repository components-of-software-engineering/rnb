from models import BaseModel


class UsagesRegisterModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO usages_register (num_blank, series_blank, date_usage, code_usage, additional_info)"
                            "VALUES ( %(num_blank)s, %(series_blank)s, %(date_usage)s, %(code_usage)s,"
                            "%(additional_info)s) RETURNING id",
            "select_query": "SELECT * FROM usages_register WHERE id = %(id)s",
            "update_query": "UPDATE usages_register SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM usages_register WHERE id = %(id)s",
            "select_all_query": "SELECT * FROM usages_register ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM usages_register",
        }

        columns = ["id", "num_blank", "series_blank", "date_usage", "code_usage", "additional_info"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)
