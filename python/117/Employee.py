class Employee:
    _raise_percent = 1.1

    # pass
    def __init__(self, first, last, department='Housekeeping', salary=45000):
        # self._first = first
        self.set_first(first)
        self.__last = last
        self._department = department
        self._salary = salary

    def __str__(self):
        return f'first: {self._first}, last: {self.__last}, department: {self._department}, salary: {self._salary}'

    def __repr__(self):
        return f"Employee('{self._first}', '{self.__last}', '{self._department}', '{self._salary}')"

    def raise_salary(self):
        # self._salary *= Employee._raise_percent
        self._salary *= self._raise_percent

    def get_first(self):
        return self._first

    def set_first(self, first: str):
        if first.startswith('x'):
            raise Exception('First can not begin with x')
        self._first = first

    @classmethod
    def set_raise_percent(cls, percent):
        cls._raise_percent = percent

    @staticmethod
    def get_departments():
        return ('houskeeping', 'president')


# print('Employee file executing')

class Developer(Employee):
    def __init__(self, first, last, department="Engineering", salary=100000, languages=()):
        super().__init__(first, last, department, salary)
        self._languages = languages


    def __str__(self):
        return_val = super().__str__()
        return_val += f', languages: {self._languages}'
        return return_val
