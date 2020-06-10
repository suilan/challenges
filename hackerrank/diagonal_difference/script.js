// Strict Mode was a new feature in ECMAScript 5 that allows you to place a program, 
// or a function, in a “strict” operating context. This strict context prevents certain 
// actions from being taken and throws more exceptions.
 
'use strict';

// The fs module provides an API for interacting with the file system 
// in a manner closely modeled around standard POSIX functions.
// https://nodejs.org/api/fs.html
// - To create the result file
const fs = require('fs');

// The process object is a global that provides information about, 
// and control over, the current Node.js process. As a global, it is always 
// available to Node.js applications without using require(). 
// It can also be explicitly accessed using require():
// https://nodejs.org/api/process.html

// Begin reading from stdin so the process does not exit.
process.stdin.resume();
process.stdin.setEncoding('utf-8');

// The path to register the result
process.env.OUTPUT_PATH = 'result-'+Date.now()+'.js';

let inputString = '';
let currentLine = 0;

// Capture the data inserted
process.stdin.on('data', function(inputStdin) {
    
    inputString += inputStdin;
});


// End the stdin with (CTRL+D) - This don't work on Windows CMD
process.stdin.on('end', function() {
    inputString = inputString.trim().split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
    // Write your code here

    let sum = 0;
    for(let i=0;i<arr.length;i++){
        if( Array.isArray(arr[i]) ){
            sum+=arr[i][i];
            sum-=arr[i][arr.length-i-1];
        }
    }

    return Math.abs(sum);
}

function main() {

    // creates the result file
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);


    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}

