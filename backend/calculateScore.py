# import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import sys 
import json
import ast 


def calculate_similarity_score(playlist1, playlist2):
    # Extract the song features from the JSON responses
    features1 = [list(song.values()) for song in playlist1]
    features2 = [list(song.values()) for song in playlist2]

    # Normalize the features
    features1 = normalize_features(features1)
    features2 = normalize_features(features2)

    # Calculate the similarity scores using cosine similarity
    similarity_scores = cosine_similarity(features1, features2)

    # Calculate the compatibility score as the average similarity score
    compatibility_score = np.mean(similarity_scores) * 100

    return compatibility_score

def normalize_features(features):
    # Transpose the feature matrix to work with columns
    features = np.array(features).T.tolist()

    # Normalize each feature to a [0, 1] range
    for i in range(len(features)):
        # feature_min = min(features[i])
        # feature_max = max(features[i])
        if (i == 0):
            # acousticness
            feature_min = 0
            feature_max = 1
        elif (i == 1):
            # danceability
            feature_min = 0
            feature_max = 1
        elif (i == 2):
            # duration_ms
            feature_min = 0 # Online says 200000 and 300000
            feature_max = 600000 #10 minutes
        elif (i == 3):
            # energy
            feature_min = 0
            feature_max = 1
        elif (i == 4):
            # instrumentalness
            feature_min = 0
            feature_max = 1
        elif (i == 5):
            # key
            feature_min = -1
            feature_max = 11
        elif (i == 6):
            # liveness
            feature_min = 0
            feature_max = 1
        elif (i == 7):
            # loudness
            feature_min = -60
            feature_max = 0
        elif (i == 8):
            # mode
            feature_min = 0
            feature_max = 1
        elif (i == 9):
            # speechiness
            feature_min = 0
            feature_max = 1
        elif (i == 10):
            # tempo
            feature_min = 50
            feature_max = 150
        elif (i == 11):
            # time_signature
            feature_min = 3
            feature_max = 7
        elif (i == 12):
            # valence
            feature_min = 0
            feature_max = 1


        features[i] = [(value - feature_min) / (feature_max - feature_min) for value in features[i]]

    # Transpose the features back to the original shape
    features = np.array(features).T.tolist()

    return features


input = ast.literal_eval(sys.argv[1])
playlist1 = input[0]
playlist2 = input[1]
compatability_score = calculate_similarity_score(playlist1, playlist2)
print(json.dumps(compatability_score))
sys.stdout.flush()