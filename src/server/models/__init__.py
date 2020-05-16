from abc import ABC, abstractmethod
from psycopg2.extras import DictCursor


class BaseModel(ABC):
    def __init__(self, connection, primary_key_names: list, insert_query, select_query,
                 update_query, delete_query, select_all_query, count_query):
        self._connection = connection
        self._cursor = connection.cursor(cursor_factory=DictCursor)

        self.__insert_query = insert_query
        self.__select_query = select_query
        self.__update_query = update_query
        self.__delete_query = delete_query
        self.__select_all_query = select_all_query
        self.__count_query = count_query

        self.__primary_key_names = primary_key_names

    def __del__(self):
        self._cursor.close()

    def rollback(self):
        self._connection.rollback()

    @property
    def primary_key_names(self):
        return self.__primary_key_names

    def read(self, pk):
        self._cursor.execute(self.__select_query, [pk])
        row = self._cursor.fetchone()
        return row

    def create(self, item: dict):
        self._cursor.execute(self.__insert_query, **item)
        self._connection.commit()

    def update(self, item: dict):
        if not self._is_valid_parameters(item):
            raise Exception("Item is not valid")
        self._cursor.execute(self.__update_query, item)
        self._connection.commit()

    def delete(self, pk):
        self._cursor.execute(self.__delete_query, [pk])
        self._connection.commit()

    @abstractmethod
    def _is_valid_parameters(self, item: dict):
        pass
