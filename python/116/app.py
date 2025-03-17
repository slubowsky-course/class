import random
x = 60

if x > 10:
    print('x is > 10')
elif x == 10:
    print('x == 10')
else:
    print('x not > or = 10')


if x == 10 or x < 10:
    print('x either = or < 10')

if x == 10 and x < 10:
    print('x both = and < 10')
else:
    print('its not')


print(10 / 3)
print(10 % 3)
print(10 // 3)

# import math
# print(math.floor(10/3))
# print(math.ceil(10/3))

# from math import floor, ceil
# print(floor(10/3))
# print(ceil(10/3))

age = 21  # None
while age == None:
    try:
        age = int(input('How old are you? '))
    except ValueError as e:
        print('Please enter a valid age')

print(f'you are {age} years old')
print(f'in {100 - age} years you will be 100 years old')

# x = z > 50 ? 'greater' : 'not greater'
print('x > 50') if x > 50 else print('x not > 50')

names = ['Donald Trump', 'JD Vance', 'Joe Biden', 'Kamala Harris']

for name in names:
    print(name)

for letter in names[0]:
    print(letter)

for i in range(10):
    print(i)

for i in range(len(names)):
    print(i, names[i])

print('-----')
for i in range(1, len(names)-1, 1):
    print(names[i])

i = 0
for name in names:
    print(i, name)
    i += 1

for index, value in enumerate(names):
    print(index, value)

people = ['Elon Musk', 'Nancy Pelosi', 'Chuck Schumer']
networth = [63432647334, 1000033000, 344324234]
popularity = [93, 23, 12]

for i in range(3):
    print(people[i], networth[i], popularity[i])

for person, nw, p in zip(people, networth, popularity):
    print(person, nw, p)

print('--------------')
for i in range(len(people) - 1, -1, -1):
    print(people[i])


search = 'Elon Musk'  # input('Who should we find? ')
for person in people:
    if (person == search):
        print(f'we found {person}')
        break
    else:
        print(f'{person} is not {search}')
else:
    print(f'We didnt find {search}')

the_number = random.randint(1, 100)
print(the_number)

tries = 0
guess = the_number  # None

while guess != the_number:
    try:
        guess = int(input('Guess the number between 1-100 '))

        tries += 1
        if guess < the_number:
            print('To low. Try again.')
        elif guess != the_number:
            print('To high. Try again.')

    except ValueError:
        print('Please enter valid numbers only')

print(f'You Won! It took you {tries} tries')


for x in range(1, 11):
    for y in range(1, 11):
        print(f'{x * y:3d}', end=' ')
    print()


numbers = (2, 4, 6, 7)
# numbers.append(10)
print(type(numbers))

more_numbers = 2, 4, 6, 7, 10, 34
empty_tuple = ()
print(type(empty_tuple))

one_number = 1,
print(type(one_number))

my_mixed_tuple = (1, 'foo', True)
for val in my_mixed_tuple:
    print(val)


if my_mixed_tuple:
    print('existance means true')


a, b, c, *the_rest, d = more_numbers
print(a, b, c, the_rest, d)

h, i, j, k, *rest = people[1]
print(h, i, j, k, rest)

potus = {
    'first': 'Donald',
    'last': 'Trump'
}

potus['age'] = 80
print(potus)

months = {
    'Jan': 31,
    'Feb': 28,
    'Mar': 31
}

for month in months:
    print(f'{month} has {months[month]}')

for month, days in months.items():
    print(f'{month} has {days}')

# print(months['Apr'])
print(months.get('Apr', 'dont know'))

fruits = set(['apple', 'pear', 'peach', 'peach'])
favorite_fruits = set(('grape', 'apple'))
print(fruits)
print(favorite_fruits)
all_fruits = fruits.union(favorite_fruits)
print(all_fruits)
print(all_fruits.difference(favorite_fruits))
favorite_fruits.add('apricot')
print(favorite_fruits)

frozen_fruits = frozenset(('apple', 'pear'))
# frozenset.add('peach')


def increment(number, foo='x', bar='y', by=1):
    print(f'in increment got {number} {foo} {bar} {by}')
    return number + by


print(f'{increment(5, 1)}')
print(f'{increment(5)}')
print(f'{increment(5, by=2)}')

# print(f'{increment('Hi', by=5)}')


def multiply(number, foo: str, bar='y', by=1) -> int:
    print(f'in multiply got {number} {foo} {bar} {by}')
    return number * by


print(f'{multiply('Hi', 'foo', by=5)}')
xx = multiply(2, foo='foo', by=2)
print(type(xx))


def add(numbers):
    total = 0
    for number in numbers:
        total += number
    return total


print(add((1, 2, 3)))
print(add([1, 2, 3]))
# print(add(1,2,3))


def add2(*numbers, foo='bar'):
    print(numbers, foo)
    total = 0
    for number in numbers:
        total += number
    return total


# print(add2((1, 2, 3)))
# print(add2([1, 2, 3]))
print(add2(1, 2, 3, foo=4))


z = 5


def use_z():
    global z
    z = 50
    print(z)


def use_z2(z):
    z = 75
    print(z)


use_z()
print(z)


use_z2(z)
print(z)


total = 0
total = add2(1, 2, 3)
print(total)

zz = None
if z < 40:
    zz = 10

print(zz)


for number in numbers:
    print(number ** 2)


squares = [n ** 2 for n in numbers]
print(squares)


def square(x):
    return x ** 2


print(list(map(square, numbers)))

print(list(map(lambda x: x ** 2, numbers)))


class Employee:
    _raise_percent = 1.1

    # pass
    def __init__(self, first, last, department='Housekeeping', salary=45000):
        #self._first = first
        self.set_first(first)
        self.__last = last
        self._department = department
        self._salary = salary

    def __str__(self):
        return f'first: {self._first}, last: {self.__last}, department: {self._department}, salary: {self._salary}'

    def __repr__(self):
        return f"Employee('{self._first}', '{self.__last}', '{self._department}', '{self._salary}')"

    def raise_salary(self):
        # self._salary *= Employee._raise_percent
        self._salary *= self._raise_percent

    def get_first(self):
        return self._first

    def set_first(self, first: str):
        if first.startswith('x'):
            raise Exception('First can not begin with x')
        self._first = first


    @classmethod
    def set_raise_percent(cls, percent):
        cls._raise_percent = percent


    @staticmethod
    def get_departments():
        return ('houskeeping', 'president')


elon = Employee('Elon', 'Musk', salary=10000)
#elon._first = 'xElon'
#elon.set_first('xElon')
elon._Employee__last = 'xMusk'
print(elon)
# print(elon._first)
print(elon.get_first())
print(elon._Employee__last)

employees = [elon]
print(employees)

donald = Employee('Donald', 'Trump', 'President', 200000)
donald._raise_percent = 2
employees.append(donald)

Employee.set_raise_percent(1.5)
for employee in employees:
    employee.raise_salary()
    print(employee)


print(elon)

print(Employee.get_departments())
