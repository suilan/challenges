/**
 * Script to calculate the max and min values from an array of integers
 */

// Strict Mode was a new feature in ECMAScript 5 that allows you to place a program, 
// or a function, in a “strict” operating context. This strict context prevents certain 
// actions from being taken and throws more exceptions.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

// The fs module provides an API for interacting with the file system 
// in a manner closely modeled around standard POSIX functions.
// https://nodejs.org/api/fs.html
// - To create the result file
const fs = require('fs');

// To help deal with different filepath representations
// https://nodejs.org/api/path.html
const path = require('path');


// // Begin reading from stdin so the process does not exit.
let inputString = '';
let currentLine = 0;
let exampleName = false;

// The process object is a global that provides information about, 
// and control over, the current Node.js process. As a global, it is always 
// available to Node.js applications without using require(). 
// It can also be explicitly accessed using require():
// https://nodejs.org/api/process.html
if( process.argv.length>2 ){
    exampleName = process.argv[2];
}

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// process.stdin.on('end', _ => {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });


function readLine() {
    return inputString[currentLine++];
}

// Read the input file
function readInput(err,data){
    if (err) {
        return console.log(err);
    }
    inputString = data.split('\n');
    
    main();
}

// Complete the staircase function below.
function staircase(n) {
    let stair='';

    for (let i = 1; i <= n ; i++) {

        for (let j = 1; j <= n; j++) {
            stair+= (j<=n-i?' ':'#');
        }

        if(i!=n) stair += '\r\n';
    }
    return stair;
}

function main() {

    // creates the result/output file
    if(!fs.existsSync('output')) fs.mkdirSync('output');
    let date = new Date().toJSON().replace(/-/g,'').replace('T','').replace(/:/g,'').substr(0,14);
    const ws = fs.createWriteStream(path.join('output', date+'output'+exampleName+'.txt'));

    const n = parseInt(readLine(), 10);

    const result = staircase(n);

    ws.write(result + '\n');
    ws.end();
}


// Check if a parameter was passed
if( exampleName ){

    //compose a valid filepath
    let filePath = path.join( __dirname.replace('js',''),'_input','input'+exampleName+'.txt')
    fs.readFile(filePath, 'utf8', readInput);
} else console.log('No example');