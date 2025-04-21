const fs = require('fs');

//reading File
fs.readFile('./docs/text.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
})

console.log('last line');

//writing File
fs.writeFile('./docs/text.txt', 'hello but it is from writeFile Function', () => {
    console.log('file was written!');
})

fs.writeFile('./docs/text2.txt', 'hello but it is from writeFile Function 2', () => {
    console.log('file was written!');
})

//directories
if (!fs.existsSync('./assets')) {
    //create directory
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created!');
    })
} else {
    //remove directory
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted!');
    })
}

//deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted!');
    })
}