from models import BaseModel


# class Notarius(object):
#     def __init__(self, id, type, status, date_status_update, num_certificate, num_card, name,
#                  name_organization, region, contacts, notarius_region, additional_info,
#                  date_issue_certificate, date_issue_card, date_reg_region, location):
#         self.id = id  # serial NOT NULL,  -- унікальний ідентифікатор
#         self.type = type  # boolean NOT NULL, -- тип(приватний/державний)
#         self.status = status  # text NOT NULL,    -- статус
#         self.date_status_update = date_status_update  # date NOT NULL,    -- дата набуття статусу
#         self.num_certificate = num_certificate  # text,             -- номер свідоцтва
#         self.num_card = num_card  # bigint,           -- номер посвідчення
#         self.name = name  # text,             -- ПІБ нотаріуса
#         self.name_organization = name_organization  # text,             -- назва нотаріальної контори
#         self.region = region  # text NOT NULL,    -- регіон
#         self.contacts = contacts  # text NOT NULL,    -- контактні дані
#         self.notarius_region = notarius_region  # text NOT NULL,    -- нотаріальний округ
#         self.additional_info = additional_info  # text,             -- додаткові відомості
#         self.date_issue_certificate = date_issue_certificate  # date,             -- дата видачі свідоцтва
#         self.date_issue_card = date_issue_card  # date,             -- дата видачі посвідчення
#         self.date_reg_region = date_reg_region  # date,             -- дата реєстрації нотаріального округу
#         self.location = location  # text NOT NULL,


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
            "select_all_query": "SELECT * FROM notarius ORDER BY id",
            "count_query": "SELECT COUNT(*) FROM notarius",
        }
        columns = ["id", "type", "status", "date_status_update", "num_certificate", "num_card", "name",
                 "name_organization", "region", "contacts", "notarius_region", "additional_info",
                 "date_issue_certificate", "date_issue_card", "date_reg_region", "location"]
        primary_key_names = ["id"]
        super().__init__(connection, columns, primary_key_names, **queries)

