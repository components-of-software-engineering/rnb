from models import *
import psycopg2

from models.CodeUsagesBlank import CodeUsagesBlankModel
from config import config


class Controller(object):
    def __init__(self):
        self._connection = psycopg2.connect(**config)
        self._code_usages_blank_model = CodeUsagesBlankModel(self._connection)
        self._code_usages_blank_model.create()

