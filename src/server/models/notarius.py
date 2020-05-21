
from datetime import date

from models import BaseModel
from random_data_generators import *

class NotariusModel(BaseModel):
    def __init__(self, connection):
        queries = {
            "insert_query": "INSERT INTO notarius (type, status, date_status_update, num_certificate, num_card, name,"
                            "name_organization, region, contacts, notarius_region, additional_info, date_issue_certificate,"
                            "date_issue_card, date_reg_region, location) VALUES (%(type)s, %(status)s, %(date_status_update)s,"
                            "%(num_certificate)s, %(num_card)s, %(name)s, %(name_organization)s, %(region)s, %(contacts)s,"
                            "%(notarius_region)s, %(additional_info)s, %(date_issue_certificate)s, %(date_issue_card)s,"
                            "%(date_reg_region)s, %(location)s) RETURNING id",
            "select_query": "SELECT * FROM notarius WHERE id = %(id)s",
            "update_query": "UPDATE notarius SET {} WHERE id = %(id)s",
            "delete_query": "DELETE FROM notarius WHERE id = %(id)s",
            "delete_all_query": "TRUNCATE TABLE notarius CASCADE",
            "select_all_query": "SELECT * FROM notarius ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM notarius",
        }
        columns = ["id", "type", "status", "date_status_update", "num_certificate", "num_card", "name",
                 "name_organization", "region", "contacts", "notarius_region", "additional_info",
                 "date_issue_certificate", "date_issue_card", "date_reg_region", "location"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)

    def generate_data(self, num: int):
        try:
            for i in range(0, num):
                self.create({
                    "type": bool(random_int_to_num(1)),
                    "status": random_string(),
                    "date_status_update": date.today(),
                    "num_certificate": random_string(),
                    "num_card": random_int(),
                    "name": random_string(),
                    "name_organization": random_string(),
                    "region": random_string(),
                    "contacts": random_string(),
                    "notarius_region": random_string(),
                    "additional_info": random_string(),
                    "date_issue_certificate": date.today(),
                    "date_issue_card": date.today(),
                    "date_reg_region": date.today(),
                    "location": random_string()
                })

        except Exception as e:
            return str(e)