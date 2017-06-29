const assert = require('assert');
const { rgb } = require('./../../../utils');

describe("Convert between rgb and excel color", () => {
  it("Should convert length 6 with hastag", () => {
    assert.deepEqual(rgb("#FFFFFF"), "FFFFFFFF");
    assert.deepEqual(rgb("#000000"), "FF000000");
  });
  it("Should convert length 6 without hastag", () => {
    assert.deepEqual(rgb("FFFFFF"), "FFFFFFFF");
    assert.deepEqual(rgb("000000"), "FF000000");
  });
  it("Should convert length 3 with hastag", () => {
    assert.deepEqual(rgb("#FFF"), "FFFFFFFF");
    assert.deepEqual(rgb("#000"), "FF000000");
  });
  it("Should convert length 3 without hastag", () => {
    assert.deepEqual(rgb("FFF"), "FFFFFFFF");
    assert.deepEqual(rgb("000"), "FF000000");
  });
});
