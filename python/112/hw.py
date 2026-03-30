from random import randint

the_number = randint(1, 100)
print(the_number)

guess = None
tries = 0

while (guess != the_number):
    try:
        guess = int(input('pick a number between 1 and 100 '))

        if guess < 0 or guess > 100:
            print('please enter a number between 1 and 100')
            continue

        tries += 1

        if (guess < the_number):
            print('To low. Try again')
        elif guess > the_number:
            print('To high. Guess again')
    except ValueError:
        print('please pick a valid number')

print(f'You won! It took you {tries} tries')
