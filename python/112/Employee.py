class Employee:
    # pass

    # class variable
    _raise_percent = .1

    def __init__(self, first, last, department='janitorial', salary=100000):
        self._first = first
        self.__last = last
        self._department = department
        self._salary = salary

    def __str__(self):
        return f'first: {self._first} last: {self.__last} department: {self._department}, salary: {self._salary}'

    def __repr__(self):
        return f'Employee({self._first}, {self.__last}, {self._department}, {self._salary})'

    def get_first(self):
        return self._first

    def set_first(self, new_first):
        if new_first == 'JD':
            raise ValueError('JD is not a valid first name for a president')
        self._first = new_first

    def raise_salary(self):
        self._salary += self._salary * self._raise_percent

    @classmethod
    def set_raise_percent(cls, new_percent):
        cls._raise_percent = new_percent

    @staticmethod
    def get_departments():
        return ('janitorial', 'president')


print('employee file executing')

foo = 'bar'
