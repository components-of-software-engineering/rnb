from models import BaseModel


class VerificationsRegisterModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO verifications_register (num_blank, series_blank, user_id, date_verification) VALUES"
                            "( %(num_blank)s, %(series_blank)s, %(user_id)s, %(date_verification)s) RETURNING id",
            "select_query": "SELECT * FROM verifications_register WHERE id = %(id)s",
            "update_query": "UPDATE verifications_register SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM verifications_register WHERE id = %(id)s",
            "select_all_query": "SELECT * FROM verifications_register ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM verifications_register",
        }

        columns = ["id", "num_blank", "series_blank", "user_id", "date_verification"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)