// example functions for unit testing purposes
export const add = (a: number, b: number) => {
    return a + b;
}

export const divide = (a: number, b: number) => {
    if ( b === 0 ) { throw new Error('Division by Zero')}
    return a / b;
}