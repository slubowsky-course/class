# import math
from math import floor, ceil

people = ['Donald', 'JD Vance', 'Marco Rubio',
          'Pete Hegseth', 'Tucker Carlson']
print(people)
print(len(people))
print(len(people[0]))
print(people[1])
print(people[1][1])

print(people[len(people) - 2])
print(people[-2])
print(people[-2][-2])

long_string = 'this is a long string to have lots of characters to work with'
print(long_string[1:])
print(long_string[1:11])
print(long_string[1:11:2])
print(long_string[:11:])
print(long_string[::2])

print(people[1:4:2])

print(long_string[::-1])
print(people[::-1])

print(people.reverse())
# print(long_string.reverse())

people.append('new guy')
print(people)

print(long_string.upper())

print(long_string * 5)

stuff = [1]
stuff.append(2)
print(stuff)
# stuff[2] = 3

# my_people = [None, None, None, ...]
my_people = [None] * 10
print(my_people)
my_people[9] = 'Donald'
print(my_people)

people.pop()
print(people)
print(people.pop(-2))
print(people)

people.remove('Pete Hegseth')
print(people)

people.insert(1, 'new guy')
print(people)

people.insert(1000, 'new guy')
print(people)

# people.clear()
# print(people)

another_ref = people
people.append('added')
print(another_ref)

a_copy = people[:]
people.append('added')
print(a_copy)

another_copy = people.copy()

print(long_string.find('w'))
print(long_string.find('x'))

print(long_string.index('w'))
# print(long_string.index('x'))

print(people.index('Marco Rubio'))
# print(people.index('xMarco Rubio'))

try:
    marco = people.index('xMarco Rubio')
    print(f'marco is at index {marco}')
    # 1 / 0
except ValueError as e:
    print(f'xMarco Rubio not found -  {e} - {type(e)}')
except ZeroDivisionError:
    print('bad math')
print('always get this')

if 'Marco Rubio' in people:
    print('found marco')
elif 5 > len(people):
    print('5 >')
else:
    print('didnt find marco')

if len(long_string) > 20 and len(long_string) < 90:
    print('>20 < 50')

if len(long_string) > 20 or len(long_string) < 100:
    print('>20 < 50')

print(10 % 3)
print(10 // 3)

# print(math.floor(10/3))
# print(math.ceil(10/3))
print(floor(10/3))
print(ceil(10/3))

age = None
while age == None:
    try:
        age = 21  # int(input('how old are you? '))
    except ValueError:
        print('Please enter a valid number')
print(f'you are {age} years old')
print(f'you will be  100 in {100 - age} years')

# msg = age > 5 ? 'you are > 5' : 'you are NOT > 5'
print('you are > 5') if age > 5 else print('you are NOT > 5')

msg = 'you are > 5' if age > 5 else 'you are NOT > 5'
print(msg)
print('----------------')
for name in people:
    print(name)
for name in long_string:
    print(name)

for i in range(10):
    print(i)

for i in range(10, 20, 2):
    print(i)

for i in range(len(people)):
    print(people[i])

i = 0
for name in people:
    print(f'{name} - {i}')
    i += 1

for index, value in enumerate(people):
    print(f'{index} - {value}')

ceos = ['elon', 'bill', 'mark', 'pichai']
salaries = [100000000, 454545, 453454656, 45435435]
ages = [50, 70, 32, 53]

for i in range(len(ceos)):
    print(ceos[i], salaries[i], ages[i])

for ceo, salary, a in zip(ceos, salaries, ages):
    print(ceo, salary, a)

search = 'mark'
for ceo in ceos:
    if (ceo == search):
        print(f'we found {search}')
        break
    else:
        print(f'{ceo} is NOT {search}')
else:
    print(f'we didnt find {search}')

for x in range(1,11):
    for y in range(1, 11):
        print(f'{x * y:3d}', end = ' ')
    print()

print(1,2,3, sep='q')

some_nums = (1,2,3)
#some_nums.append(4)
some_more_nums = 1,2,3,4
print(type(some_more_nums))

empty_tuple = ()
print(type(empty_tuple))

tuple_of_one = 1,
print(type(tuple_of_one))

numbers = (1,2,3,4,5,6, 7)
p1,p2,p3, *the_rest, p_second_to_last, p_last = numbers
print(p1,p2,p3, the_rest, p_second_to_last, p_last)

l1,l2,l3,*rest = people[0]
print(l1, l2, l3, rest)

potus = {
    'first': 'Donald',
    'last': 'Trump'
}

print(potus['first'])

months = {
    'Jan': 31,
    'Feb': 28,
    'Mar': 31
}

for month in months:
    print(f'{month} has {months[month]}')

for month, days in months.items():
    print(f'{month} has {days}')

#print(months['Apr'])
print(months.get('Apr'), 'not found')

letters = set(['a', 'b', 'b', 'c'])
print(letters)
more_letters = set(('c', 'd', 'e'))

print(letters.union(more_letters))
print(letters.intersection(more_letters))
print(letters.difference(more_letters))

letters.add('z')
fs = frozenset(letters)
#fs.add('z')


def increment(number: int, foo = 'foo', bar = 'bar', increment = 1) -> int:
    print(f'got {number} {foo} {bar} {increment}')
    return number + increment

print(increment(5))
print(increment(5,increment = 5))
print(increment('Hi', increment='Bye'))

z: int
z = increment(1,2)

q: str
q = increment('Hi', increment='by')
print(type(q))

def add(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

print(add([1,2,3]))
print(add((1, 2,3)))
#print(add(1, 2, 3))


def add2(*numbers):
    total = 0
    for number in numbers:
        total += number
    return total


#print(add2([1, 2, 3]))
#print(add2((1, 2, 3)))
print(add2(1, 2, 3))

q = 5

def do_something():
    global q
    q = 10
    print(q)

do_something()
print(q)

q = 5
def do_something2(q):
    q = 10
    print(q)
    return q

q = do_something2(q)
print(q)

qq = None
if q > 10:
    qq = 10

print(qq)

for number in some_more_nums:
    print(number * number)

results = [n * n for n in some_more_nums]
print(results)

def square(n):
    return n * n


print(list(map(square, some_more_nums)))

print(list(map(lambda x: x * x, some_more_nums)))
