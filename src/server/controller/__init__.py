from os import path

import psycopg2
from psycopg2.extras import DictCursor

from models.code_usages_blank import CodeUsagesBlankModel
from models.notarius import NotariusModel
from models.blank import BlankModel
from models.usages_register import UsagesRegisterModel
from models.users import UsersModel
from models.journal_actions import JournalActionsModel
from models.verifications_register import VerificationsRegisterModel
from connection import PostgresConnection


class Controller(object):
    def __init__(self):
        self._connection = PostgresConnection().get_connection()
        self._cursor = self._connection.cursor(cursor_factory=DictCursor)
        self._create_tables()

        self._code_usages_blank_model = CodeUsagesBlankModel(self._connection)
        self._notarius_model = NotariusModel(self._connection)
        self._blank_model = BlankModel(self._connection)
        self._usages_register_model = UsagesRegisterModel(self._connection)
        self._users_model = UsersModel(self._connection)
        self._journal_actions_model = JournalActionsModel(self._connection)
        self._verifications_register_model = VerificationsRegisterModel(self._connection)
        res = self._code_usages_blank_model.create({"code": 1, "text_representation": "2"})
        print(res)

        res = self._verifications_register_model.create({
            "num_blank": 1,
            "series_blank": 'series_blank',
            "user_id": 4,
            "date_verification": "2000-01-01"
        })
        print(res)

    @property
    def connection(self):
        return self._connection

    def _create_tables(self):
        file_path = path.join(path.dirname(path.abspath(__file__)), '../create_tables.sql')
        with open(file_path, 'r') as f:
            sql = f.read()
        self._cursor.execute(sql)
        self._connection.commit()



