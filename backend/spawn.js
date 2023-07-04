const spawner = require('child_process').spawn;

function calculateSimilarityScore(playlist1, playlist2) {
  return new Promise((resolve, reject) => {
    const python_process = spawner('python3', ['./calculateScore.py', JSON.stringify([playlist1, playlist2])]);

    python_process.stdout.on('data', (data) => {
      const result = JSON.parse(data.toString());
      resolve(result);
    });

    python_process.stderr.on('data', (error) => {
      reject(error.toString());
    });
  });
}

module.exports = calculateSimilarityScore;