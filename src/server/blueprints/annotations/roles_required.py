from flask_jwt_extended import get_jwt_identity

roles_with_id = {
    "admin": 1,
    "registrar": 0,
    "utilizer": 3
}


# class roles_required(object):
#     def __init__(self, args: list):
#         self.args = args
#
#     def __call__(self, f):
#         s = [roles_with_id[role] for role in self.args]
#
#         def wrapped_f(*args, **kwargs):
#             current_user = get_jwt_identity()
#             if current_user['role'] not in s:
#                 f(*args, **kwargs)
#
#         return wrapped_f


def roles_required(roles: list):
    current_user = get_jwt_identity()
    s = [roles_with_id[role] for role in roles]
    if current_user['role'] not in s:
        return 400
    return 200

