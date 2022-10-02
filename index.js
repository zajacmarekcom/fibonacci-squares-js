const ITERATIONS = 10;

const last = fibonacci(ITERATIONS);
const preLast = fibonacci(ITERATIONS-1);


function fibonacci(iterations) {
    let value = 1;
    let previous = 0;

    for (i = 1; i < iterations; i++) {
        let next = value + previous;
        previous = value;
        value = next;
    }

    return value;
}