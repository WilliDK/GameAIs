import pandas as pd
import numpy as np
import json
data = pd.read_csv("data/movies.csv")

def getData():
    return data

profile = {}
trained = set()
def train_profile_random(n):
    x = (np.random.rand(n)*len(data)/2).astype(int)
    for i in x:
        if i in trained:
            np.append(x, np.random.rand(1)*len(data)/2)
        else:
            train(data["genres"][i], int(input("rate " + data["title"][i] + " from 0 to 10: ")))
    for genre in profile:
        profile[genre] = sum(profile[genre])/len(profile[genre])

def train_profile_from_top(n):
    for i in range(n):
        train(data["genres"][i], int(input("rate " + data["title"][i] + " from 0 to 10: ")))
    for genre in profile:
        profile[genre] = sum(profile[genre])/len(profile[genre])

def train(genreset, rating):
    genreset = json.loads(genreset)
    for genre in genreset:
        if genre["name"] not in profile:
            profile[genre["name"]] = [rating]
        else:
            profile[genre["name"]].append(rating)

def getProfile():
    return profile

# train_profile(5)
# train_profile(5)
# print(profile)

# Judge from contour of colors which is mapped ot a set of genres. These contours are generated from the movies.