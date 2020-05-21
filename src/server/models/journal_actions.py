from models import BaseModel


class JournalActionsModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO journal_actions (user_id, action_date, action_type, row_affected, old_value, new_value)"
                            "VALUES ( %(user_id)s, %(action_date)s, %(action_type)s, %(row_affected)s, %(old_value)s,"
                            "%(new_value)s) RETURNING id",
            "select_query": "SELECT * FROM journal_actions WHERE id = %(id)s",
            "update_query": "UPDATE journal_actions SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM journal_actions WHERE id = %(id)s",
            "delete_all_query": "TRUNCATE TABLE journal_actions CASCADE",
            "select_all_query": "SELECT * FROM journal_actions ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM journal_actions",
        }

        columns = ["id", "user_id", "action_date", "action_type", "row_affected", "old_value", "new_value"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)

