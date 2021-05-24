class Account:
    _number_of_accounts = 0
    _next_account_number = 10000

    def __init__(self, account_holder, opening_balance):
        self._account_holder = account_holder
        # self._balance = opening_balance
        self._balance = 0
        Account._number_of_accounts += 1
        self._account_number = Account._next_account_number
        Account._next_account_number += 1

        self.transact(opening_balance)

    def get_account_holder(self):
        return self._account_holder

    def get_balance(self):
        return self._balance

    @classmethod
    def get_number_of_accounts(cls):
        return Account._number_of_accounts

    def transact(self, amount):
        self._balance += amount

    def __str__(self):
        return f'''
Account Holder: {self._account_holder}
Account Number: {self._account_number}
Balance:        {self._balance}
        '''

    def __repr__(self):
        return f'Account({self._account_holder}, {self._balance})'


a1 = Account('Joe', 1000)
print(a1)
accounts = [a1]
print(accounts)

a1.transact(50)
print(a1)

a1.transact(-100)
print(a1)

print(Account.get_number_of_accounts())

a2 = Account('Kamala', 2000)
print(Account.get_number_of_accounts())

print(a2)


class Minimum_Balance_Account(Account):
    _minimum_allowed = 1000

    def transact(self, amount):
        if self._balance + amount < Minimum_Balance_Account._minimum_allowed:
            raise Exception(f'{self._balance} + {amount} would be less then minimum {Minimum_Balance_Account._minimum_allowed}')

        return super().transact(amount)



#a3 = Minimum_Balance_Account('Jen', 500)
#print(a3)

#a3.transact(-300)

