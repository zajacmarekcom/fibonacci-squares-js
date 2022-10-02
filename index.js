const black = "\x1b[30m";  
   const red = "\x1b[31m";
   const green = "\x1b[32m";
   const yellow = "\x1b[33m";
   const blue = "\x1b[34m";
   const magenta = "\x1b[35m";
   const cyan = "\x1b[36m";
   const white = "\x1b[37m";

const ITERATIONS = 5;
const values = fibonacci(ITERATIONS);
const last = values[values.length - 1];
const preLast = ITERATIONS > 1 ? values[values.length - 2] : 0;
let x = 2 + last;
let y = 2 + last;

if (ITERATIONS % 2) {
    y += preLast;
    y += Math.floor(ITERATIONS / 2) - 1;
} else {
    x += preLast;
    x += Math.floor(ITERATIONS / 2) - 1;
}

let directions = [];

for (i = 1; i <= ITERATIONS; i++) {
    directions.push(i % 4);
}

var array = createArray();
renderRect(array, values, directions, ITERATIONS);
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
            if (i == 0 || i == y-1 || j == 0 || j == x-1) {
                array[i][j] = magenta + "■";
            } else {
                array[i][j] = " ";
            }
        }
    }

    return array;
}

function renderRect(array, values, directions, iteration) {
    const index = iteration - 1;
    console.log("values: " + values);
    console.log("directions: " + directions);
    console.log("iteration: " + iteration);
    if (directions[index] == 0) {
        for (i = 1 ; i <= values[index] + 1; i++) {
            array[i][values[index] + 1] = "O";
        }
    } else if (directions[index] == 1) {
        for (i = 1 ; i <= values[index] + 1; i++) {
            array[array.length - values[index] - 1][i] = "0";
        }
    } else if (directions[index] == 2) {
        for (i = 1 ; i <= values[index] + 1; i++) {
            array[i][array[i].length - values[index] - 1] = "O";
        }
    } else {
        for (i = 1 ; i <= values[index] + 1; i++) {
            array[values[index] + 1][i] = "O";
        }
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