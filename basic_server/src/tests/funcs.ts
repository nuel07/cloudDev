// example functions for unit testing purposes

//function that adds two numbers
export const add = (a: number, b: number) => {
    return a + b;
}

//function that divides two numbers
export const divide = (a: number, b: number) => {
    if ( b === 0 ) { throw new Error('Division by zero')}
    return a / b;
}

//function that concatenates two strings
export const concat = ( str1: string, str2: string) => {
    if (str1.length === 0 || str2.length === 0) {
        throw new Error ('Empty string')
    }
    return str1 + str2;
}