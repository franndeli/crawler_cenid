import requests
from bs4 import BeautifulSoup, Tag
import os
import json
from tqdm import tqdm
if __name__ == '__main__':
    noticias = []
    index = 0
    title = date = text = author = category = ""
    for i in range(1, 11):
        if i == 1:
            response = requests.get("https://www.tresdeu.com/category/cultura/discos", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Discos"
        if i == 2:
            response = requests.get("https://www.tresdeu.com/category/cultura/videoclips", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Videoclips"
        if i == 3:
            response = requests.get("https://www.tresdeu.com/category/cultura/cinema-i-televisio", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Cinema i televisio"
        if i == 4:
            response = requests.get("https://www.tresdeu.com/category/cultura/festivals", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Festivals"
        if i == 5:
            response = requests.get("https://www.tresdeu.com/category/cultura/teatre", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Teatre"
        if i == 6:
            response = requests.get("https://www.tresdeu.com/category/tendencies/internet", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Internet"
        if i == 7:
            response = requests.get("https://www.tresdeu.com/category/tendencies/opinio", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Opinio"
        if i == 8:
            response = requests.get("https://www.tresdeu.com/category/tendencies/llibres", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Llibres"
        if i == 9:
            response = requests.get("https://www.tresdeu.com/category/tendencies/llista", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Llista"
        if i == 10:
            response = requests.get("https://www.tresdeu.com/category/tendencies/llocs", headers={'User-Agent': 'Mozilla/5.0'})
            category = "Llocs"
        
        if response.status_code == 200:
            data = response._content
            bs = BeautifulSoup(data, "html.parser")
            if bs:
                articles = bs.find('div', {'class': 'posts-list'}).find_all('div', {'class': 'card card--category'})
                for article in tqdm(articles):
                    link = article.find('a').get('href')
                    response = requests.get(link, headers={'User-Agent': 'Mozilla/5.0'})
                    if response.status_code == 200:
                        data = response._content
                        bs = BeautifulSoup(data, "html.parser")
                        if bs:
                            title = bs.find('h1')
                            if title:
                                title = title.text.strip()

                            date = bs.find('div', {'class': 'post-meta__date text-3'})
                            if date:
                                date = date.text.strip()

                            author = bs.find('div', {'class': 'post-author__name text-3'})
                            if author:
                                author = author.text.strip()
                            
                            sections_body = bs.find('div', {'class': 'post-entry__wrap'}).find_all('div', {'class': 'post-entry__content'})
                        
                            text = ""
                            if sections_body:
                                for element in sections_body[0]:
                                    if isinstance(element, Tag):
                                        if 'p' == element.name:
                                            text += element.text + '\n'
                                        if 'h2' == element.name:
                                            text += element.text + '\n'
                                        if 'h3' == element.name:
                                            text += element.text + '\n'
                                        if 'h4' == element.name:
                                            text += element.text + '\n'   

                            noticias.append({"id": index, "url": link, "category": category, "title": title, "author": author, "date": date, "content": text})

                            index += 1

            f = open(os.getcwd() + '/tresdeu.json', "w+", encoding='utf-8')
            f.write(json.dumps(noticias, indent=4, ensure_ascii=False))

