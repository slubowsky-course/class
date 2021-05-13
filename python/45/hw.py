name = 'Joe Biden'
address = '1600 Pennsylvania Ave'
children = ['bo', 'foo', 'hunter', 'melissa']

print(
    f'''Name: {name} \nAddress: {address}
    Children: {children} Child #1 {children[0]} Child #2 {children[1]} Child #3 {children[2]}''')

for child in children:
    print(child)

print(name[::3])
print(children[1])
print(children[len(children) - 2])
print(children[-2][1:-1])

for x in range(1, 11):
    line = ''
    for y in range(1, 11):
        #line += '{:3d} '.format(x * y)
        line += f'{x * y :3d} '
    print(line)


import random
the_number = random.randint(1, 100)
print(f'Dont tell - the number is {the_number}')
guess = 0
tries = 0
while guess != the_number:
    try:
        guess = int(input('Guess the number '))

        if guess < 1 or guess > 100:
            print('Please enter numbers between 1 and 100 only')
            continue

        tries += 1

        if guess < the_number:
            print('To low! Guess higher next time')
        elif guess > the_number:
            print('To high! Guess lower next time')
    except ValueError:
        print('Please enter numbers only')

print(f'You won! It took you {tries} tries')


a = 5
b = 6
c =27
the_numbers = [a,b,c]
x = 5 + 5
print(x)
print(5+5)

more_numbers = [5,6,27]

import this