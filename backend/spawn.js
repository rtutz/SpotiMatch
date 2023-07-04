const spawner = require('child_process').spawn;

function calculateSimilarityScore(playlist1, playlist2) {

    const python_process = spawner('python3', ['./calculateScore.py', JSON.stringify([playlist1, playlist2])])

    python_process.stdout.on('data', (data) => {
        console.log('Data received from python script: ', JSON.parse(data.toString()))
    });
};

const playlist1 = [
    {
      "acousticness": 0.00242,
      "danceability": 0.585,
      "duration_ms": 237040,
      "energy": 0.842,
      "instrumentalness": 0.00686,
      "key": 9,
      "liveness": 0.0866,
      "loudness": -5.883,
      "mode": 0,
      "speechiness": 0.0556,
      "tempo": 118.211,
      "time_signature": 4,
      "valence": 0.428
    },
    {
        "acousticness": 0.00242,
        "danceability": 0.585,
        "duration_ms": 237040,
        "energy": 0.842,
        "instrumentalness": 0.00686,
        "key": 9,
        "liveness": 0.0866,
        "loudness": -5.883,
        "mode": 0,
        "speechiness": 0.0556,
        "tempo": 118.211,
        "time_signature": 4,
        "valence": 0.428
      },
      {
        "acousticness": 0.001,
        "danceability": 0.7,
        "duration_ms": 200000,
        "energy": 0.8,
        "instrumentalness": 0.005,
        "key": 5,
        "liveness": 0.1,
        "loudness": -7.5,
        "mode": 1,
        "speechiness": 0.03,
        "tempo": 120.0,
        "time_signature": 4,
        "valence": 0.6
      }
  ];
  
  const playlist2 = [
    {
      "acousticness": 0.001,
      "danceability": 0.7,
      "duration_ms": 200000,
      "energy": 0.8,
      "instrumentalness": 0.005,
      "key": 5,
      "liveness": 0.1,
      "loudness": -7.5,
      "mode": 1,
      "speechiness": 0.03,
      "tempo": 120.0,
      "time_signature": 4,
      "valence": 0.6
    },
    {
        "acousticness": 0.001,
        "danceability": 0.7,
        "duration_ms": 200000,
        "energy": 0.8,
        "instrumentalness": 0.005,
        "key": 5,
        "liveness": 0.1,
        "loudness": -7.5,
        "mode": 1,
        "speechiness": 0.03,
        "tempo": 120.0,
        "time_signature": 4,
        "valence": 0.6
      },
      {
        "acousticness": 0.00242,
        "danceability": 0.585,
        "duration_ms": 237040,
        "energy": 0.842,
        "instrumentalness": 0.00686,
        "key": 9,
        "liveness": 0.0866,
        "loudness": -5.883,
        "mode": 0,
        "speechiness": 0.0556,
        "tempo": 118.211,
        "time_signature": 4,
        "valence": 0.428
      }
  ];


calculateSimilarityScore(playlist1, playlist2);