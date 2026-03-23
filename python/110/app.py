print('hello world')

x = 5
print(type(x), x)

x = 'hello'
print(type(x), x)

x = 5784356345439564358743656436934856465465
print(type(x), x)

x = 98.6
print(type(x), x)

x = True
print(type(x), x)

x = None
print(type(x), x)

# this is a comment
# another line

y: int | None = None

y = 5


print('a' + 'b')
print('a' 'b')

print(''' this
      is a
      multiline
      string''')

first = 'Donald'
last = 'Trump'
print(f'first: {first} last: {last}')
print('first: {} last: {}'.format(first, last))

a = 5
print(f'before {a:3d} after')
print(f'before {a:>3d} after')
print(f'before {a:<3d} after')

a = 543435435345435456
print(f'before {a:<3,d} after')

print(first.lower())
print(first)
print(first.replace('o', 'a'))
print(first)
first = first.replace('o', 'a');
print(first)
