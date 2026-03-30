from Employee import Employee

class Developer(Employee):
    def __init__(self, first, last, department='engineering', salary=120000, languages=('JavaScript', 'C#')):
        super().__init__(first, last, department, salary)
        self._languages = languages

    def __str__(self):
        ret_val = super().__str__()
        ret_val += f' languages = {self._languages}'
        return ret_val
