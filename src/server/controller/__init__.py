import psycopg2

from models.code_usages_blank import CodeUsagesBlankModel
from models.notarius import NotariusModel
from models.blank import BlankModel
from models.usages_register import UsagesRegisterModel
from models.users import UsersModel
from models.journal_actions import JournalActionsModel
from models.verifications_register import VerificationsRegisterModel
from config import config


class Controller(object):
    def __init__(self):
        self._connection = psycopg2.connect(**config)
        self._code_usages_blank_model = CodeUsagesBlankModel(self._connection)
        self._notarius_model = NotariusModel(self._connection)
        self._blank_model = BlankModel(self._connection)
        self._usages_register_model = UsagesRegisterModel(self._connection)
        self._users_model = UsersModel(self._connection)
        self._journal_actions_model = JournalActionsModel(self._connection)
        self._verifications_register_model = VerificationsRegisterModel(self._connection)
