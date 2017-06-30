const assert = require('assert');
const { generateColumnWidths } = require('./../../../utils');

describe("Generates column widths", () => {
  it("Should work with data", () => {
    const defaultWidth = "10.719387755102";
    const cols = {
      1: "20",
      2: "40",
      14: "20",
    };
    const expected = [
      {min: "1", max: "1", width: "20"},
      {min: "2", max: "2", width: "40"},
      {min: "3", max: "13", width: defaultWidth},
      {min: "14", max: "14", width: "20"},
      {min: "15", max: "1025", width: defaultWidth}
    ];
    assert.deepEqual(generateColumnWidths(cols), expected);
  });
  it("Should work with no data", () => {
    const defaultWidth = "10.719387755102";
    const cols = {};
    const expected = [
      {min: "1", max: "1025", width: defaultWidth}
    ];
    assert.deepEqual(generateColumnWidths(cols), expected);
  });
});
