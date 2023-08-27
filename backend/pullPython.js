function calculateSimilarityScore(playlist1, playlist2) {
  // Helper function to normalize features
  function normalizeFeatures(features) {
      // Transpose the feature matrix to work with columns
      features = features[0].map((col, i) => features.map(row => row[i]));

      // Normalize each feature to a [0, 1] range
      for (let i = 0; i < features.length; i++) {
          const featureMin = 0;
          const featureMax = 1;
          features[i] = features[i].map(value => (value - featureMin) / (featureMax - featureMin));
      }

      // Transpose the features back to the original shape
      features = features[0].map((col, i) => features.map(row => row[i]));

      return features;
  }

  // Remove unwanted keys from each song in the playlists
  function removeUnwantedKeys(playlist) {
      const unwantedKeys = [
          "type",
          "id",
          "uri",
          "track_href",
          "analysis_url",
          "duration_ms",
          "key",
          "loudness",
          "tempo",
          "time_signature"
      ];

      for (const song of playlist) {
          for (const key of unwantedKeys) {
              delete song[key];
          }
      }
  }

  // Remove unwanted keys from both playlists
  removeUnwantedKeys(playlist1);
  removeUnwantedKeys(playlist2);

  // Extract features from the playlists
  const features1 = playlist1.map(song => Object.values(song));
  const features2 = playlist2.map(song => Object.values(song));

  // Normalize the features
  const normalizedFeatures1 = normalizeFeatures(features1);
  const normalizedFeatures2 = normalizeFeatures(features2);

  // Calculate the similarity scores using cosine similarity
  const similarityScores = [];

  for (const song1 of normalizedFeatures1) {
      const songSimilarities = [];
      for (const song2 of normalizedFeatures2) {
          songSimilarities.push(cosineSimilarity(song1, song2));
      }
      similarityScores.push(songSimilarities);
  }

  // Calculate the compatibility score as the average similarity score
  let totalScore = 0;
  let count = 0;

  for (const row of similarityScores) {
      for (const score of row) {
          totalScore += score;
          count++;
      }
  }

  const compatibilityScore = (totalScore / count) * 100;

  return compatibilityScore;
}

function getIndexOfKey(key) {
  const keyMapping = {
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
  };

  return keyMapping[key];
}

function cosineSimilarity(features1, features2) {
  // Calculate cosine similarity between two feature vectors
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < features1.length; i++) {
      dotProduct += features1[i] * features2[i];
      norm1 += features1[i] * features1[i];
      norm2 += features2[i] * features2[i];
  }

  if (norm1 === 0 || norm2 === 0) {
      return 0;
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}



// // var spawn = require('child_process').spawn,
// //     py    = spawn('python', ['./calculateScore.py']),
// //     data = [1,2,3,4,5,6,7,8,9],
// //     dataString = '';

// // py.stdout.on('data', function(data){
// //   
// //   dataString += data.toString();
// // });
// // py.stdout.on('end', function(){
// //   
// // });
// // py.stdin.write(JSON.stringify(data));
// // py.stdin.end();


// function calculateSimilarityScore(playlist1, playlist2) {
//   // 
//   // var spawn = require('child_process').spawn,
//   // py    = spawn('python', ['./calculateScore.py']),
//   // data = [playlist1, playlist2],
//   // dataString = '';

//   // py.stdout.on('data', function(data){
//   //   dataString = JSON.parse(data.toString());
//   //   
//   //   return dataString
//   // });

//   // py.stdin.write(JSON.stringify(data));
//   // py.stdin.end();
  
  

//   return new Promise((resolve, reject) => {
//     var spawn = require('child_process').spawn,
//       py = spawn('python', ['./calculateScore.py']),
//       data = [playlist1, playlist2],
//       dataString = '';

//     py.stdout.on('data', function (data) {
//       dataString = JSON.parse(data.toString());

//       console.log("DATA STRING " + data);
      
//       resolve(dataString); // Resolve the promise with the dataString value
//     });

//     py.stderr.on('data', function (error) {
//       reject(error.toString()); // Reject the promise with the error message
//     });

//     py.stdin.write(JSON.stringify(data));
//     py.stdin.end();
//   });
// }


// module.exports = calculateSimilarityScore;

// // const spawner = require('child_process').spawn;

// // function calculateSimilarityScore(playlist1, playlist2) {
// //   return new Promise((resolve, reject) => {
// //     const python_process = spawner('python3', ['./calculateScore.py', JSON.stringify([playlist1, playlist2])]);

// //     python_process.stdout.on('data', (data) => {
// //       const result = JSON.parse(data.toString());
// //       resolve(result);
// //     });

// //     python_process.stderr.on('data', (error) => {
// //       reject(error.toString());
// //     });
// //   });
// // }

// // module.exports = calculateSimilarityScore;

// // const fs = require('fs');
// // const spawner = require('child_process').spawn;

// // function calculateSimilarityScore(inputFilePath, resultFilePath) {
// //   return new Promise((resolve, reject) => {
// //     const python_process = spawner('python3', ['./calculateScore.py', inputFilePath, resultFilePath]);

// //     python_process.stdout.on('data', (data) => {
// //       const result = JSON.parse(data.toString());
// //       resolve(result);
// //     });

// //     python_process.stderr.on('data', (error) => {
// //       reject(error.toString());
// //     });
// //   });
// // }

// // module.exports = calculateSimilarityScore;


