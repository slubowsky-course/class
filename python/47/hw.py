from random import randint


class Die:
    def __init__(self, num_sides):
        self._sides = num_sides
        self._value = 1

    def value(self):
        return self._value

    def roll(self):
        self._value = randint(1, self._sides)
        return self._value

    def __str__(self):
        return f'sides: {self._sides} value: {self._value}'


class Six_Sided_Die(Die):
    def __init__(self):
        #self._sides = 6
        #self._value = 1
        super().__init__(6)

d = Die(12)
print(d)

for i in range(10):
    print(d.roll())

print(d)

d6 = Six_Sided_Die()
print(d6)

for i in range(10):
    print(d6.roll())

print(d6)
