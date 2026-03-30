from playsound import playsound
from Employee import Employee, foo
from Developer import Developer

donald = Employee('Donald', 'Trump', 'president')
print(donald)

donald.__last = 'changed'
print(donald)

donald._Employee__last = 'changed'
print(donald)

donald.foo = 'bar'
print(donald.foo)

donald.set_first('Marco')
print(donald.get_first())


# donald.set_first('JD')

people = [donald]
print(people)

# donald.raise_salary()
# print(donald)


hegseth = Employee('Pete', 'hegseth', 'war', 100000)
people.append(hegseth)

donald._raise_percent = .2

Employee.set_raise_percent(.05)

for employee in people:
    employee.raise_salary()
    print(employee)


print(Employee.get_departments())

elon = Developer('elon', 'musk', salary = 75000)
print(elon)

print(foo)

class NotEmployee:
    pass

nae = NotEmployee()
nae._first = 'nae'
nae._Employee__last = 'nae'
nae._department = 'nae'
nae._salary = 0

print(Employee.__str__(nae))


playsound('crunch.mp3')
