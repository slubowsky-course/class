class Employee1:
    pass

joe = Employee1()
print(joe)

joe.first = 'Joe'
joe.last = 'Biden'

print(f'{joe.first} {joe.last}')


class Employee:
    _raise_percent = 1.05

    def __init__(self, first, last, department = None, salary = 35000):
        self._first = first
        self._last = last
        self._department = department
        self._salary = salary
        #print(self)
        #print(self.__str__())
        print(self.__str())

    def get_first(self):
        return self._first

    def set_first(self, first):
        if first == None:
            raise ValueError('First name can not be None')
        self._first = first

    def print(self):
        print(f'First: {self._first} Last: {self._last} Department: {self._department} Salary: {self._salary}')

    def __str__(self):
        return f'First: {self._first} Last: {self._last} Department: {self._department} Salary: {self._salary}'

    def __repr__(self):
        return f'Employee({self._first}, {self._last}, {self._department}, {self._salary})'

    def raise_salary(self):
        self._salary *= self._raise_percent

    @classmethod
    def set_raise_percent(cls, raise_percent):
        cls._raise_percent = raise_percent

    @staticmethod
    def getDepartments():
        return ['Plumbing', 'Sales', 'Marketing']

    __str = __str__

kamala = Employee('Kamala', 'Harris')
print(kamala)
#print(f'{kamala.first} {kamala.last} {kamala.department} {kamala.salary}')
kamala.print()

myorkis = Employee('Someone', 'Myorkis', 'DHS')
print(myorkis)
#print(f'{myorkis.first} {myorkis.last} {myorkis.department} {myorkis.salary}')
myorkis.print()

another = Employee('Another', 'Guy', salary = 50000)
print(another)
#print(f'{another.first} {another.last} {another.department} {another.salary}')
another.print()

some_employees = [myorkis, kamala]
print(some_employees)

kamala._raise_percent = 1.1
#kamala._first = None
#kamala.set_first(None)

#Employee.raise_percent = 1.06
Employee.set_raise_percent(1.06)

for employee in some_employees:
    employee.raise_salary()
    print(employee)

print(Employee.getDepartments())


class Developer(Employee):
    def __init__(self, first, last, department, salary, language):
        super().__init__(first, last, department, salary)
        self._language = language

    def __str__(self):
        return super().__str__() + f' Language: {self._language}'

    __str = __str__


bill = Developer('Bill', 'Gates', 'Engineering', 100000, 'Basic')
print(bill)

print(bill.__dir__())
print(bill.__dict__)


class Not_An_Employee:
    pass

not_an_employee = Not_An_Employee()
not_an_employee._first = 'Im'
not_an_employee._last = 'Not an employee'
not_an_employee._department = 'IT'
not_an_employee._salary = 50000

Employee.print(not_an_employee)

kamala.print()
printKamala = kamala.print

printKamala()
