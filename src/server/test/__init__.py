from test.test_verifications_register import TestVerificationsRegister
from test.test_usages_register import TestUsagesRegisterModel
from test.test_users import TestUsers
from test.test_notarius import TestNotarius
from test.test_journal_actions import TestJournalActions
from test.test_code_usages_blank import TestCodeUsagesBlank
from test.test_blank import TestBlank
import unittest


def create_suite():
    test_suite = unittest.TestSuite()

    # test_suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestVerificationsRegister)
    test_suite.addTest(TestVerificationsRegister('test'))
    test_suite.addTest(TestUsagesRegisterModel('test'))
    test_suite.addTest(TestUsagesRegisterModel('test'))
    test_suite.addTest(TestUsers('test'))
    test_suite.addTest(TestNotarius('test'))
    test_suite.addTest(TestJournalActions('test'))
    test_suite.addTest(TestCodeUsagesBlank('test'))
    test_suite.addTest(TestBlank('test'))
    return test_suite


if __name__ == '__main__':
    suite = create_suite()

    runner = unittest.TextTestRunner()
    runner.run(suite)
