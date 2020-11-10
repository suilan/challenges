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

function readLine() {
    return inputString[currentLine++];
}

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    let sum = 0;
    let min = null;
    let max = null;
    for(var i=(arr.length-1);i>=0;i--){
        sum=0;
        for(var j=0;j<arr.length;j++){
            if(j!=i) sum+=arr[j];
        }

        if(!min ) {
            min=sum;
            max=sum;
        }
        else if(sum>max) max=sum;
        else if(sum<min) min=sum;
    }

    return min+' '+max;

}


function main() {
    
    // creates the result/output file
    if(!fs.existsSync('output')) fs.mkdirSync('output');
    let date = new Date().toJSON().replace(/-/g,'').replace('T','').replace(/:/g,'').substr(0,14);
    const ws = fs.createWriteStream(path.join('output', date+'output'+exampleName+'.txt'));

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = miniMaxSum(arr);

    ws.write(result + '\n');
    ws.end();
}

// Check if a parameter was passed
if( exampleName ){

    //compose a valid filepath
    let filePath = path.join( __dirname.replace('js',''),'_input','input'+exampleName+'.txt')
    fs.readFile(filePath, 'utf8', readInput);
} else console.log('No example');