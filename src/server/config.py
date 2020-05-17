import os

config_db = {
    'host': os.getenv("DB_HOST"),
    'port': os.getenv("DB_PORT"),
    'database': os.getenv("DB_DBNAME"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASS")
}

# config_db = {
#     'host': "localhost",
#     'port': "5432",
#     'database': "rnb",
#     'user': "postgres",
#     'password': "reRhsybrcs1038"
# }


config_jwt = {
    'JWT_SECRET_KEY': os.getenv("JWT_SECRET"),
    'JWT_REFRESH_COOKIE_PATH': '/api/refresh',
    'JWT_TOKEN_LOCATION': ['cookies']
}

other_configs = {
    "pwd_salt": os.getenv("PWD_SALT")
}
