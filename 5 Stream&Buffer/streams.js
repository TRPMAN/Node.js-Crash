const fs = require('fs');

const readStream = fs.createReadStream('./test.txt', {encoding : 'utf-8'});
const writeStream = fs.createWriteStream('./test2.txt', {encoding : 'utf-8'});
// readStream.on('data', (chunk) => {
//     console.log('-----NEW CHUNK-----');
//     console.log(chunk.toString());
//     writeStream.write('\n NEW CHUNK \n');
//     writeStream.write(chunk.toString());
//     console.log('-------------------');
// });

// piping
readStream.pipe(writeStream);