"use strict";
const assert = require('assert');

function sum(number) {
  if (number === undefined) {
    return 0;
  }
  return function wrapper(n) {
    if (n !== undefined) {
      number += n;
      return wrapper;
    }
    return number;
  };
}

describe('sum', () => {
  it('no arguments number', () => {
    assert.equal(sum(),0);
  });
  it('no null arguments number', () => {
    assert.equal(sum(1)(2)(3)(4)(5)(6)(7)(),28);
  });
});
