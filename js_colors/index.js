const ITERATIONS = 10;

const black = "\x1b[30m";  
   const red = "\x1b[31m";
   const green = "\x1b[32m";
   const yellow = "\x1b[33m";
   const blue = "\x1b[34m";
   const magenta = "\x1b[35m";
   const cyan = "\x1b[36m";
   const white = "\x1b[37m";
   const crimson = "\x1b[29m";

//array of colorful blocks
const blocks = [
    black + "■",
    red + "■",
    green + "■",
    blue + "■",
    yellow + "■",
    magenta + "■",
    cyan + "■",
    white + "■"
];

//calc Fibonacci's numbers
const values = fibonacci(ITERATIONS);

//Take biggest value
const last = values[values.length - 1];
//Take one previous biggest value
const preLast = ITERATIONS > 1 ? values[values.length - 2] : 0;

//Declare variables for array of pixels
let x = last;
let y = last;

//Array should be wider of highier in different cases of number of iterations
if (ITERATIONS % 2) {
    y += preLast;
} else {
    x += preLast;
}

//Create array for "pixels"
const array = createArray();

let lastIteration = ITERATIONS;
//Render biggest square
renderRect(array, values, 0, 0, lastIteration);

//Render whole array of pixels
render(array);

function fibonacci(iterations) {
    let result = [1];
    let value = 1;
    let previous = 0;

    for (i = 1; i < iterations; i++) {
        let next = value + previous;
        previous = value;
        value = next;
        result.push(value);
    }

    return result;
}

function createArray() {
    let array = new Array(y);

    for (i = 0; i < y; i++) {
        array[i] = new Array(x);
    }
    
    for (i = 0; i < y; i++) {
        for (j = 0; j < x; j++) {
            array[i][j] = "";
        }
    }

    return array;
}

//Recursive function to rendering squares
//array - array of pixels
//values - array of Fibonacci numbers
//xOffset, yOffset - ofsets for starting point for next iteration
//iteration - current iteration to render
function renderRect(array, values, xOffset, yOffset, iteration) {
    const index = iteration - 1;
    //character to render for current iteration
    const character = blocks[iteration % 8];

    let currentValue = values[index];

    //In my implementation where I'm starting from the last Fibonacci number I assumed that each iteration is rendered in different "direction" inside whole rectangle.
    let currentDirection = iteration % 4;

    //Put all pixels for current square
    for (i = 0 ; i < currentValue; i++) {
        for (j = 0; j < currentValue; j++)
        if (currentDirection == 0) {
            array[i + yOffset][j + xOffset] = character;
        } else if (currentDirection == 1) {
            if (index == 0) {
                array[i + yOffset][j + xOffset] = character;
                return;
            } else {
                array[i + yOffset + values[index - 1]][j + xOffset] = character;
            }
        } else if (currentDirection == 2) {
            array[i + yOffset][j + xOffset + values[index - 1]] = character;
        } else {
            array[i + yOffset][j + xOffset] = character;
        }
    }
    //Recursive call with changed offset for next iteration
    if (currentDirection == 0) {
        renderRect(array, values, xOffset + currentValue, yOffset, iteration - 1);
    } else if (currentDirection == 1) {
        renderRect(array, values, xOffset, yOffset, iteration - 1);
    } else if (currentDirection == 2) {
        renderRect(array, values, xOffset, yOffset, iteration - 1);
    } else {
        renderRect(array, values, xOffset, yOffset + currentValue, iteration - 1);
    }
}

//Render whole array of pixels
function render(array) {
    let result = "";
    for (i = 0; i < y; i++) {
        for (j = 0; j < x; j++) {
            result += array[i][j] + " ";
        }
        result += "\n";
    }
    
    console.log(result);
}