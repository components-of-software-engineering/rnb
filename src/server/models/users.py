import uuid
from datetime import date

from models import BaseModel
import hashlib
from random_data_generators import *


class UsersModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO users (name, role, date_registration, username, pwd_hash, pwd_salt, "
                            "date_last_update, status) VALUES ( %(name)s, %(role)s, %(date_registration)s,"
                            "%(username)s, %(pwd_hash)s, %(pwd_salt)s, %(date_last_update)s, %(status)s) RETURNING id",
            "select_query": "SELECT * FROM users WHERE username = %(username)s",
            "update_query": "UPDATE users SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM users WHERE id = %(id)s",
            "delete_all_query": "TRUNCATE TABLE users CASCADE",
            "select_all_query": "SELECT * FROM users ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM users",
        }

        columns = ["id", "name", "role", "date_registration", "username",
                   "pwd_hash", "pwd_salt", "date_last_update", "status"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)

    def create(self, item: dict): # item["pwd_salt"] passed in func as password argument
        item["pwd_hash"] = hashlib.sha512((item["pwd_hash"] + item["pwd_salt"]).encode('utf-8')).hexdigest()
        return super().create(item)

    def generate_data(self, num: int):
        try:
            for i in range(0, num):
                self.create({
                    "name": random_string(),
                    "role": random_int_to_num(3),
                    "date_registration": date.today(),
                    "username": random_string(),
                    "pwd_hash": random_string(),
                    "pwd_salt": uuid.uuid4().hex,
                    "date_last_update": date.today(),
                    "status": True
                })

        except Exception as e:
            return str(e)