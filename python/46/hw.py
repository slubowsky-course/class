from typing import Union


def print_days_in_month_manual():
    months = ['January', 'February', 'March']
    days = [31, 28, 31]

    i = 0
    while i < len(months):
        print(f'{months[i]} => {days[i]}')
        i += 1


print_days_in_month_manual()


def print_days_in_month():
    months = ['January', 'February', 'March']
    days = [31, 28, 31]

    for month, day in zip(months, days):
        print(f'{month} => {day}')


print_days_in_month()


def print_days_in_month_tuple():
    months = ('January', 'February', 'March')
    days = 31, 28, 31  # parens not needed for tuple

    for month, day in zip(months, days):
        print(f'{month} => {day}')


print_days_in_month_tuple()


def print_days_in_month_dict():
    months_days = {
        "January": 31,
        "February": 28,
        "March": 31
    }

    # for month in months_days:
    #print(f'{month} => {months_days[month]}')
    for month, days in months_days.items():
        print(f'{month} => {days}')


print_days_in_month_dict()


def get_days_in_month(month: str) -> Union[int, None]:
    months_days = {
        "January": 31,
        "February": 28,
        "March": 31
    }

    # if month in months_days:
    # return months_days[month]
    # return -1

    return months_days.get(month.title())  # , -1)


month_to_get = 'January'
print(f'{month_to_get} has {get_days_in_month(month_to_get)} days')

month_to_get = 'january'
print(f'{month_to_get} has {get_days_in_month(month_to_get)} days')

month_to_get = 'foo'
print(f'{month_to_get} has {get_days_in_month(month_to_get)} days')

# print(f'{5} has {get_days_in_month(5)} days')

global_months_days = {
    "January": 31,
    "February": 28,
    "March": 31
}


def print_days_in_month_global_dict():
    for month, days in global_months_days.items():
        print(f'{month} => {days}')


def get_days_in_month_global(month: str) -> int:
    return global_months_days.get(month.title(), -1)

print_days_in_month_global_dict()

month_to_get = 'January'
print(f'{month_to_get} has {get_days_in_month_global(month_to_get)} days')

month_to_get = 'january'
print(f'{month_to_get} has {get_days_in_month_global(month_to_get)} days')

month_to_get = 'foo'
print(f'{month_to_get} has {get_days_in_month_global(month_to_get)} days')
