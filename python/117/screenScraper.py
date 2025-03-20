from bs4 import BeautifulSoup
import requests

response = requests.get('https://github.com/slubowsky-course/')
# print(response.text)

response.text
soup = BeautifulSoup(response.content, 'html.parser')
#print(soup.prettify())

the_div = soup.find('div', class_='js-pinned-items-reorder-container')
#print(the_div)

repos = the_div.find_all('div', class_='pinned-item-list-item-content')

for repo in repos:
    print('repo name:', repo.find('span', class_='repo').text.strip())
    print('repo description:', repo.find('p', class_='pinned-item-desc').text.strip())
