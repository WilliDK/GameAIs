from movie_recommendation_service import DataGatherring
import json

# get the profile
DataGatherring.train_profile_from_top(15)
data = DataGatherring.getData()
profile = DataGatherring.getProfile()
print(profile)

# basic prediction by minimizing r-squared
def findOptimal():
    max = 0
    movieMax = 0
    for i in range(len(data["genres"])):
        current = 0
        genreset = json.loads(data["genres"][i])
        for genre in genreset:
            print(genre)
            if genre["name"] in profile:
                current += profile[genre["name"]]
            else:
                current += 5
        current = (current / len(genreset) if len(genreset) != 0 else 0)
        if(current > max):
            max = current
            movieMax = i
    return data["title"][movieMax]

def findOptimals():
    movies = []
    for i in range(len(data["genres"])):
        current = 0
        genreset = json.loads(data["genres"][i])
        for genre in genreset:
            print(genre)
            if genre["name"] in profile:
                current += profile[genre["name"]]
            else:
                current += 5
        current = (current / len(genreset) if len(genreset) != 0 else 0)
        movies.append((data["title"][i], current))
    movies.sort(key=customSort, reverse=True)
    return movies

def customSort(el):
    return el[1]

print(findOptimals())