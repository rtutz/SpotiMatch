// var spawn = require('child_process').spawn,
//     py    = spawn('python', ['./calculateScore.py']),
//     data = [1,2,3,4,5,6,7,8,9],
//     dataString = '';

// py.stdout.on('data', function(data){
//   
//   dataString += data.toString();
// });
// py.stdout.on('end', function(){
//   
// });
// py.stdin.write(JSON.stringify(data));
// py.stdin.end();


function calculateSimilarityScore(playlist1, playlist2) {
  // 
  // var spawn = require('child_process').spawn,
  // py    = spawn('python', ['./calculateScore.py']),
  // data = [playlist1, playlist2],
  // dataString = '';

  // py.stdout.on('data', function(data){
  //   dataString = JSON.parse(data.toString());
  //   
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

      console.log("DATA STRING " + data);
      
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


