from abc import ABC

from models import BaseModel


# class CodeUsagesBlank(object):
#     def __init__(self, code, text_representation):
#         self.code = code
#         self.text_representation = text_representation


class CodeUsagesBlankModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO code_usages_blank (code, text_representation) VALUES (%(code)s,"
                            "%(text_representation)s) RETURNING code",
            "select_query": "SELECT * FROM code_usages_blank WHERE code = %(code)s",
            "update_query": "UPDATE code_usages_blank SET {} WHERE code = %(code)s",
            "delete_query": "DELETE FROM code_usages_blank WHERE code = %(code)s",
            "select_all_query": "SELECT * FROM code_usages_blank ORDER BY code",
            "count_query": "SELECT COUNT(*) FROM code_usages_blank",
        }

        columns = ["code", "text_representation"]
        primary_key_names = ["code"]
        super().__init__(connection, columns, primary_key_names, **queries)

