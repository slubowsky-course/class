from random import randint


def get_random_numbers(how_many, min, max):
    # numbers = []
    # for i in range(how_many):
    #    numbers.append(randint(min, max))
    # return numbers
    return [randint(min, max) for i in range(how_many)]


def selection_sort(list):
    first_unsorted = 0

    while first_unsorted < len(list) - 1:
        min_index = first_unsorted
        for i in range(min_index + 1, len(list)):
            if list[i] < list[min_index]:
                min_index = i

        #temp = list[first_unsorted]
        #list[first_unsorted] = list[min_index]
        #list[min_index] = temp

        list[first_unsorted], list[min_index] = list[min_index], list[first_unsorted]

        first_unsorted += 1


some_numbers = get_random_numbers(10, 25, 50)
print(some_numbers)

selection_sort(some_numbers)

print(some_numbers)

def bubble_sort(list):
    swapped = True
    stop = 1
    while swapped:
        swapped = False
        for i in range(len(list) - stop):
            if list[i] > list[i+1]:
                list[i], list[i+1] = list[i+1], list[i]
                swapped = True
        stop += 1

some_numbers = get_random_numbers(10, 25, 50)
print(some_numbers)

bubble_sort(some_numbers)

print(some_numbers)

# 1 3 5
def insertion_sort(list):
    i = 1
    while i < len(list):
      j = i
      while j > 0 and list[j-1] > list[j]:
          list[j], list [j-1] = list[j-1], list[j]
          j = j - 1
      i = i + 1

some_numbers = get_random_numbers(10, 25, 50)
print(some_numbers)

insertion_sort(some_numbers)

print(some_numbers)
