import string
import random
import sys


def random_string(string_length=100):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))


def random_int(limit_for_random=2147483647): # postgresql int max value
    return random.randint(-limit_for_random, limit_for_random)


def random_int_to_num(num: int):
    return random.randint(0, num)

