# import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json
import ast


def calculate_similarity_score(playlist1, playlist2):
    # Extract the song features from the JSON responses
    # playlist1 = json.loads(playlist1)
    # playlist2 = json.loads(playlist2)

    # song.pop("type")
    # song.pop("id")
    # song.pop("uri")
    # song.pop("track_href")
    # song.pop("analysis_url")
    #
    # playlist2.pop("type")
    # playlist2.pop("id")
    # playlist2.pop("uri")
    # playlist2.pop("track_href")
    # playlist2.pop("analysis_url")

    for song in playlist1:
        song.pop("type")
        song.pop("id")
        song.pop("uri")
        song.pop("track_href")
        song.pop("analysis_url")
        song.pop('duration_ms')
        song.pop('key')
        song.pop('loudness')
        song.pop('tempo')
        song.pop('time_signature')

    for song in playlist2:
        song.pop("type")
        song.pop("id")
        song.pop("uri")
        song.pop("track_href")
        song.pop("analysis_url")
        song.pop('duration_ms')
        song.pop('key')
        song.pop('loudness')
        song.pop('tempo')
        song.pop('time_signature')

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
# def calculate_similarity_score(playlist1, playlist2):
#     num_features = len(playlist1[0])  # Assuming all songs have the same number of features

#     total_score = 0
#     for song1, song2 in zip(playlist1, playlist2):
#         score = 0
#         for feature in song1:
#             if feature != "analysis_url" and feature != "id" and feature != "track_href" and feature != "uri":
#                 if song1[feature] == song2[feature]:
#                     score += 1
#         song_score = (score / num_features) * 100
#         total_score += song_score

#     compatibility_score = total_score / len(playlist1)
#     return compatibility_score


def get_index_for_key(key):
    key_mapping = {
        'acousticness': 0,
        'danceability': 1,
        'duration_ms': 2,
        'energy': 3,
        'instrumentalness': 4,
        'key': 5,
        'liveness': 6,
        'loudness': 7,
        'mode': 8,
        'speechiness': 9,
        'tempo': 10,
        'time_signature': 11,
        'valence': 12
    }

    return key_mapping.get(key)


# def normalize_features(features):
#     feature_ranges = {
#         'acousticness': (0, 1),
#         'danceability': (0, 1),
#         'duration_ms': (0, 600000),
#         'energy': (0, 1),
#         'instrumentalness': (0, 1),
#         'key': (-1, 11),
#         'liveness': (0, 1),
#         'loudness': (-60, 0),
#         'mode': (0, 1),
#         'speechiness': (0, 1),
#         'tempo': (50, 150),
#         'time_signature': (3, 7),
#         'valence': (0, 1)
#     }

#     # Transpose the feature matrix to work with columns
#     features = np.array(features).T.tolist()

#     # Normalize each feature to a [0, 1] range
#     for key, values in feature_ranges.items():
#         feature_min, feature_max = values

#         index = get_index_for_key(key)
#         if index is None:
#             continue

#         normalized_features = []
#         for value in features[index]:
#             normalized_value = (float(value) - feature_min) / \
#                 (feature_max - feature_min)
#             normalized_features.append(normalized_value)

#         features[index] = normalized_features

#     # Transpose the features back to the original shape
#     features = np.array(features).T.tolist()

#     return features

def normalize_features(features):
    # Transpose the feature matrix to work with columns
    features = np.array(features).T.tolist()

    # Normalize each feature to a [0, 1] range
    for i in range(len(features)):
        feature_min = 0
        feature_max = 1
        features[i] = [(value - feature_min) / (feature_max - feature_min) for value in features[i]]

    # Transpose the features back to the original shape
    features = np.array(features).T.tolist()

    return features


def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
    # UNCOMMENT IF FUNCTION WORKS
    # get our data as an array from read_in()
    lines = read_in()

    playlist1 = lines[0]
    playlist2 = lines[1]

    compatability_score = calculate_similarity_score(playlist1, playlist2)

    print(json.dumps(compatability_score))


if __name__ == '__main__':
    main()
