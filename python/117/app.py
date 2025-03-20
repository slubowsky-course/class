from playsound import playsound
from Employee import Employee, Developer

donald = Employee('Donald', 'Trump')
print(donald)

elon = Developer('Elon', 'Musk', languages=("python", "javascript"))
print(elon)
print(elon._languages)


class NotAnEmployee:
    pass


nae = NotAnEmployee()
nae._first = 'Joe'
nae._Employee__last = 'Biden'
nae._department = 'Retired'
nae._salary = 1

print(Employee.__str__(nae))

playsound('crunch.mp3')
