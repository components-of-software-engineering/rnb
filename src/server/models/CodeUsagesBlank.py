from abc import ABC

from models import BaseModel


class CodeUsagesBlank(object):
    def __init__(self, code, text_representation):
        self.code = code
        self.text_representation = text_representation


class CodeUsagesBlankModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO code_usages_blank (text_representation) VALUES (%(text_representation)s) RETURNING code",
            "select_query": "SELECT * FROM code_usages_blank WHERE code = %s",
            "update_query": "UPDATE code_usages_blank SET text_representation = %(text_representation)s WHERE code = %(code)s",
            "delete_query": "DELETE FROM code_usages_blank WHERE code = %s",
            "select_all_query": "SELECT * FROM cities ORDER BY code",
            "count_query": "SELECT COUNT(*) FROM cities",
        }
        primary_key_names = ["code"]
        super().__init__(connection, primary_key_names, **queries)

    @staticmethod
    def _get_item_from_row(row: dict):
        return CodeUsagesBlank(**row)

    def _is_valid_parameters(self, item: dict):
        return None
