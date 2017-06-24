const assert = require('assert');
const {cellToColRow, colRowToCell} = require('./../../../utils');

describe("Convert between numeric and alphanumeric coodinates", () => {
  it("Should convert cell to row and column", () => {
    assert.deepEqual(cellToColRow("A1"), {col: 1, row: 1});
    assert.deepEqual(cellToColRow("A4"), {col: 1, row: 4});
    assert.deepEqual(cellToColRow("AA10"), {col: 27, row: 10});
  });
  it("Should convert row and column to cell", () => {
    assert.deepEqual(colRowToCell(1, 1), "A1");
    assert.deepEqual(colRowToCell(1, 4), "A4");
    assert.deepEqual(colRowToCell(27, 10), "AA10");
  });
});
