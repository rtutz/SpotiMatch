// var spawn = require('child_process').spawn,
//     py    = spawn('python', ['./calculateScore.py']),
//     data = [1,2,3,4,5,6,7,8,9],
//     dataString = '';

// py.stdout.on('data', function(data){
//   console.log(data.toString());
//   dataString += data.toString();
// });
// py.stdout.on('end', function(){
//   console.log('Sum of numbers=',dataString);
// });
// py.stdin.write(JSON.stringify(data));
// py.stdin.end();


function calculateSimilarityScore(playlist1, playlist2) {
  // console.log('in pull python');
  // var spawn = require('child_process').spawn,
  // py    = spawn('python', ['./calculateScore.py']),
  // data = [playlist1, playlist2],
  // dataString = '';

  // py.stdout.on('data', function(data){
  //   dataString = JSON.parse(data.toString());
  //   console.log('dataString', dataString);
  //   return dataString
  // });

  // py.stdin.write(JSON.stringify(data));
  // py.stdin.end();
  return new Promise((resolve, reject) => {
    var spawn = require('child_process').spawn,
      py = spawn('python', ['./calculateScore.py']),
      data = [playlist1, playlist2],
      dataString = '';

    py.stdout.on('data', function (data) {
      dataString = JSON.parse(data.toString());
      console.log('dataString', dataString);
      resolve(dataString); // Resolve the promise with the dataString value
    });

    py.stderr.on('data', function (error) {
      reject(error.toString()); // Reject the promise with the error message
    });

    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
  });
}


module.exports = calculateSimilarityScore;

// const spawner = require('child_process').spawn;

// function calculateSimilarityScore(playlist1, playlist2) {
//   return new Promise((resolve, reject) => {
//     const python_process = spawner('python3', ['./calculateScore.py', JSON.stringify([playlist1, playlist2])]);

//     python_process.stdout.on('data', (data) => {
//       const result = JSON.parse(data.toString());
//       resolve(result);
//     });

//     python_process.stderr.on('data', (error) => {
//       reject(error.toString());
//     });
//   });
// }

// module.exports = calculateSimilarityScore;

// const fs = require('fs');
// const spawner = require('child_process').spawn;

// function calculateSimilarityScore(inputFilePath, resultFilePath) {
//   return new Promise((resolve, reject) => {
//     const python_process = spawner('python3', ['./calculateScore.py', inputFilePath, resultFilePath]);

//     python_process.stdout.on('data', (data) => {
//       const result = JSON.parse(data.toString());
//       resolve(result);
//     });

//     python_process.stderr.on('data', (error) => {
//       reject(error.toString());
//     });
//   });
// }

// module.exports = calculateSimilarityScore;


