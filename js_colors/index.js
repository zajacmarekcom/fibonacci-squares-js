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

const values = fibonacci(ITERATIONS);
const last = values[values.length - 1];
const preLast = ITERATIONS > 1 ? values[values.length - 2] : 0;
let x = last;
let y = last;

if (ITERATIONS % 2) {
    y += preLast;
} else {
    x += preLast;
}

let directions = [];

for (i = 1; i <= ITERATIONS; i++) {
    directions.push(i % 4);
}

var array = createArray();
renderRect(array, values, directions, 0, 0, ITERATIONS);
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
            array[i][j] = "□";
        }
    }

    return array;
}

function renderRect(array, values, directions, xOffset, yOffset, iteration) {
    const index = iteration - 1;
    const character = blocks[iteration % 8];

    let currentValue = values[index];
    let currentDirection = directions[index];
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
    if (currentDirection == 0) {
        renderRect(array, values, directions, xOffset + currentValue, yOffset, iteration - 1);
    } else if (currentDirection == 1) {
        renderRect(array, values, directions, xOffset, yOffset, iteration - 1);
    } else if (currentDirection == 2) {
        renderRect(array, values, directions, xOffset, yOffset, iteration - 1);
    } else {
        renderRect(array, values, directions, xOffset, yOffset + currentValue, iteration - 1);
    }
}

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