import psycopg2
from config import config_db


class SingletonMeta(type):
    _instance = None

    def __call__(cls):
        if cls._instance is None:
            cls._instance = super().__call__()
        return cls._instance


class PostgresConnection(metaclass=SingletonMeta):
    def __init__(self):
        self.__conn = psycopg2.connect(**config_db)

    def get_connection(self):
        return self.__conn
