"use strict";
const assert = require('assert');

function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce((promise, func) => {
        return promise.then(async currentValue => {
            let result = await func().catch(error => {
                console.log(error);
            });
            return result !== undefined ?
                reduce(currentValue, result) :
                currentValue;
        });
    }, Promise.resolve(initialValue));
}

describe('promiseReduce', () => {
    it('only success asyncFunctions promises', async () => {
        let fn1 = () => {
            console.log("f1");
            return Promise.resolve(2)
        };
        let fn2 = () => new Promise(resolve => {
            console.log("f2");
            setTimeout(() => resolve(2), 10000)
        });
        let fn3 = () => new Promise(resolve => {
            console.log("f3");
            setTimeout(() => resolve(2), 1000)
        });
        assert.equal(await promiseReduce(
            [fn1, fn2, fn3],
            function(memo, value) {
                return memo * value
            },
            1,
        ), 8);
    });
    it('fail and success asyncFunctions promises', async () => {
        let fn1 = () => {
            return Promise.resolve(2)
        };
        let fn2 = () => {
            return Promise.reject(new Error("unexpected error"))
        };
        let fn3 = () => new Promise(resolve => {
            setTimeout(() => resolve(2), 1000)
        });
        assert.equal(await promiseReduce(
            [fn1, fn2, fn3],
            function(memo, value) {
                return memo * value
            },
            1,
        ), 4);
    });
});