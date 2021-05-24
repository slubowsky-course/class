from excel import OpenExcel

f = OpenExcel('test.xls')
print(f.read('A1'))  # read 'A1' position

print(f)
