// Strict Mode was a new feature in ECMAScript 5 that allows you to place a program, 
// or a function, in a “strict” operating context. This strict context prevents certain 
// actions from being taken and throws more exceptions.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';


// The process object is a global that provides information about, 
// and control over, the current Node.js process. As a global, it is always 
// available to Node.js applications without using require(). 
// It can also be explicitly accessed using require():
// https://nodejs.org/api/process.html

// Begin reading from stdin so the process does not exit.
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the plusMinus function below.
function plusMinus(arr) {
    let negativeNumberCount=0;
    let positiveNumberCount=0;
    let zeroNumberCount=0;

    for(let i=0; i < arr.length; i++ ){

        if(arr[i]>0){
            positiveNumberCount++;
        }
        else if(arr[i]<0){
            negativeNumberCount++;
        }
        else{
            zeroNumberCount++;
        }
    }

    printValue(positiveNumberCount,arr.length);
    printValue(negativeNumberCount,arr.length);
    printValue(zeroNumberCount,arr.length);

}

function printValue(numberCount, total){
    // Number format
    // .toExponential()
    // .toPrecision()
    // .toFixed()
    // https://blog.udemy.com/javascript-format-number/
    console.log((numberCount/total).toFixed(6));
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
