import { add, divide, concat } from './funcs';
import { expect } from 'chai';
import 'mocha';

//testing the add function
describe('add function', () => {
    it ('should add two positive integers', () => {
        const result = add(2,5);
        expect(result).to.equal(7);
    });
    it ('should add positive and negative numbers', () => {
        const result = add(-2, 2);
        expect(result).to.equal(0);
    });
});

//testing the divide function
describe('divide function', () =>{
    it ('should divide two numbers', () => {
        const result = divide(6, 3);
        expect(result).to.equal(2);
    });
    it ('should divide 5 by 2', () => {
        const result = divide(5, 2);
        expect(result).to.equal(2.5);
    });
    it ('should throw an error for zero division', () => {
        expect(() => { divide(6, 0)}).to.throw('Division by zero')
    });
});

//testing the concat function
describe ('concat function', () => {
    it ('should concatenate two strings', () => {
        const final_str = concat("Emma", "nuel");
        expect(final_str).to.equal("Emmanuel");
    });
    it ('should throw an error if any of the strings is empty', () => {
        expect(() => { concat("", "nuel")}).to.throw('Empty string')
    });
});