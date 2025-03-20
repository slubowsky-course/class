from random import randint


class Die:
    def __init__(self, sides):
        self._sides = sides
        self._value = 1

    def __str__(self):
        return f'sides: {self._sides}, value: {self._value}'

    def roll(self):
        self._value = randint(1, self._sides)
        return self._value

    def value(self):
        return self._value


class SixSidedDie(Die):
    def __init__(self):
        super().__init__(6)

die = Die(6)
print(die)

for i in range(10):
    print(die.roll())
print(die)
print(die.value())

twelveSidedDie = Die(12)
print(twelveSidedDie)

for i in range(10):
    print(twelveSidedDie.roll())
print(twelveSidedDie)
print(twelveSidedDie.value())


sixSidedDie = SixSidedDie()
print(sixSidedDie)
for i in range(10):
    print(sixSidedDie.roll())
print(sixSidedDie)
