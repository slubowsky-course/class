from bs4 import BeautifulSoup
import requests

r = requests.get('https://github.com/slubowsky-course')
soup = BeautifulSoup(r.content, 'html.parser')
# print(soup.prettify())

the_div = soup.find('div', class_='js-pinned-items-reorder-container')
#print(the_div)

repos = the_div.find_all('div', class_='pinned-item-list-item-content')

for repo in repos:
    name = repo.find('span', class_='repo')
    print(name.text.strip())
