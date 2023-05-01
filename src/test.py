

# use python library beautifulsoup to parse html
def get_movie_rating_from_imdb(movie):
    url = "http://www.imdb.com/find?q=" + movie
    response = urllib2.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html)
    movie_url = soup.find('td', 'result_text').find('a')['href']
    movie_url = "http://www.imdb.com" + movie_url
    response = urllib2.urlopen(movie_url)
    html = response.read()
    soup = BeautifulSoup(html)
    rating = soup.find('span', 'rating-rating').find('span', 'value').text
    return rating