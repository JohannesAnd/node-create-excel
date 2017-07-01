const assert = require('assert');
const { offset } = require('./../../../utils');

describe("Offset cells by number of rows/columns", () => {
  it("Should add rows and columns", () => {
    assert.deepEqual(offset("A1", {col: 1, row: 2}), "B3");
  });
  it("Should not go below A1", () => {
    assert.deepEqual(offset("A1", {col: -1, row: -1}), "A1");
  });
});
