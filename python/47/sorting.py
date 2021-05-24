from random import randint
#import account
from account import Account

numbers = []
for i in range(10):
    numbers.append(randint(1, 100))

print(numbers)

print(sorted(numbers))

# numbers = sorted(numbers)

print(numbers)

numbers.sort()

print(numbers)

print(sorted((3, 2, 1)))

numbers.clear()

for i in range(10):
    numbers.append(randint(1, 100))

print('Joe Biden'.lower())
print(sorted('Joe Biden'))
print(sorted('Joe Biden', key=str.lower))


#a1 = account.Account('Joe', 1000)
a1 = Account('Joe', 2000)
print(a1)

a2 = Account('Kamala', 1000)
print(a2)

accounts = [a1, a2]
print(accounts)
# print(sorted(accounts))   <-- we could override operator < for accounts
print(sorted(accounts, key=lambda account: account._account_holder))
print(sorted(accounts, key=lambda account: account.get_balance()))
