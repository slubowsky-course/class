# False = 0, '', [], (), {}, False, None
# True = anything else

#LIFO
class Stack:
    def __init__(self):
        self._values = []

    def push(self, val):
        self._values.append(val)

    def pop(self):
        return self._values.pop()

    def peek(self):
        return self._values[-1] if self._values else None

stack = Stack()
for i in range(10):
    stack.push(i)

while stack.peek() != None:
    print(stack.pop())


if {}:
    print('{} is not false')
