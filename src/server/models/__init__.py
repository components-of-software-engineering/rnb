from abc import ABC, abstractmethod
from psycopg2.extras import DictCursor


class BaseModel(ABC):
    def __init__(self, connection, columns: list, primary_key_names: list, insert_query, select_query,
                 update_query, delete_query, select_all_query, count_query):
        self._connection = connection
        self._cursor = connection.cursor(cursor_factory=DictCursor)

        self.__insert_query = insert_query
        self.__select_query = select_query
        self.__update_query = update_query
        self.__delete_query = delete_query
        self.__select_all_query = select_all_query
        self.__count_query = count_query

        self._columns = columns
        self._primary_key_names = primary_key_names
        if not all([key in self._columns for key in self._primary_key_names]):
            raise Exception("Parameters columns or primary_key_names are not valid")

    def __del__(self):
        self._cursor.close()

    def rollback(self):
        self._connection.rollback()

    @property
    def primary_key_names(self):
        return self._primary_key_names

    def read(self, keys: dict):
        self._cursor.execute(self.__select_query, keys)
        row = self._cursor.fetchone()
        return dict(row)

    def create(self, item: dict):
        self._cursor.execute(self.__insert_query, item)
        self._connection.commit()

    def update(self, arguments_to_update: dict, primary_keys: dict):
        if not self._is_valid_parameters(arguments_to_update):
            raise Exception("Item is not valid")
        self._cursor.execute(self.__update_query.format(self._arguments_to_str(arguments_to_update)),
                             primary_keys)
        self._connection.commit()

    def delete(self, primary_keys: dict):
        self._cursor.execute(self.__delete_query, primary_keys)
        self._connection.commit()

    def _is_valid_parameters(self, item: dict) -> bool:
        return all([column in self._columns for column in item])

    def _arguments_to_str(self, item: dict):
        return ", ".join("%s = %s" % (key, "\'" + value + "\'" if isinstance(value, str) else value)
                         for (key, value) in item.items())
