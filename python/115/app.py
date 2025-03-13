print('hello world')

x = 5
print(type(x), x)

x = 98.6
print(type(x), x)

x = 'hello'
print(type(x), x)

x = True
print(type(x), x)

x = None
print(type(x), x)

# this is a comment

my_long_variable_name = 434543543534543545543536546546546546456
print(type(my_long_variable_name), my_long_variable_name)

y: int|None|str = None
y = 'hello'
print(y)

print('hello' 'world')

z = '''line one
   line two
line three
'''
print(z)

first = 'Donald'
last = 'Trump'
print(f'first: {first} last: {last}')
print('first: {} last: {}'.format(first, last))

a = 5
print(f'{a:3d}')
print(f'{a:<3d}')
print(f'{a:>3d}')

a = 4546456546546
print(f'{a:<3,d}')

b = 'hello'
print(b.capitalize())

b.replace('l', 'm')
print(b)
print(b.replace('l', 'm'))
b = b.replace('l', 'm')
print(b)

people = ['Donald', 'JD', 'Joe', 'Kamala']
print(people)

print(len(people))
print(len(b))

print(people[2])
print(b[2])

print(people[len(people) - 2])
print(people[-2])
print(b[-2])

a_long_string = 'This is a long string so we have lots of characters'
print(a_long_string[5:20:2])
print(a_long_string[:])

copy1 = a_long_string;
copy2 = a_long_string[1:]
print(id(a_long_string), id(copy1), id(copy2))

print(a_long_string[5:])
print(a_long_string[:15])
print(a_long_string[::2])

some_people = people[1:]
print(some_people)

some_people = people[1::2]
print(some_people)

print(a_long_string[::-1])
print(people[::-1])

people.reverse()
print(people)

people.append('Kylie')
print(people)

print(a_long_string * 20)

print(people * 2)

stuff = [1]
print(stuff[0])

#stuff.append(2)
#stuff[1] = 2
print(stuff)

my_people = [None] * 10
my_people[3] = 'Donald'
print(my_people)

#my_people.append(['JD', 'Joe'])
my_people.extend(['JD', 'Joe'])
print(my_people)

print(my_people.pop(), my_people)
#print(my_people.pop(3), my_people)
print(my_people.pop(-8), my_people)

my_people.remove('JD')
print(my_people)

my_people[3] = 'Kamala'
print(my_people)

my_people.insert(-3, 'Kamala')
print(my_people)

#my_people.clear()
print(my_people)

another_ref = my_people
copy1 = my_people[:]
copy2 = my_people.copy()
my_people.pop()
print(another_ref, my_people, copy1, copy2)

print(a_long_string.find('l'))
print(a_long_string.find('x'))

print(a_long_string.index('l'))
#print(a_long_string.index('x'))
#another line

print(people.index('Joe'))
#print(people.index('Bob'))

try:
  bob = people.index('Bob')
  print(f'found bob at {bob}')
except:
  print('didnt find bob')

try:
  #raise ValueError("Invalid value provided")
  bob = people.index('Joe')
  print(f'found Joe at {bob}')
  1/0
except ValueError as e:
  print(f'didnt find Joe - {e}')
except ZeroDivisionError as e:
  print(f'oops divide by user - {e}')
finally:
  print('get here regardless if success or error')
print('always see this')

if 'xJoe' in people:
  print(people.index('xJoe'))
else:
  print('no xJoe')
