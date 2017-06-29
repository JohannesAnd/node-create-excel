const assert = require('assert');
const Workbook = require('./../../../src/Workbook');

describe("Shared string object", () => {
  it("Should return shared string index", () => {
    const book = new Workbook();
    const stringIndex = book._addSharedString("foo");
    assert.equal(stringIndex, 0);
  });
  it("Should return same shared string index when added twice", () => {
    const book = new Workbook();
    const stringIndex1 = book._addSharedString("foo");
    const stringIndex2 = book._addSharedString("foo");

    assert.equal(stringIndex1, stringIndex2);
    assert.equal(stringIndex1, 0);
  });
  it("Should compute complex stuff correctly", () => {
    const book = new Workbook();
    const s1 = book._addSharedString("foo");
    const s2 = book._addSharedString("bar");
    const s3 = book._addSharedString("foo");
    const s4 = book._addSharedString("baz");
    const s5 = book._addSharedString("goo");

    assert.equal(s1, 0);
    assert.equal(s2, 1);
    assert.equal(s3, 0);
    assert.equal(s4, 2);
    assert.equal(s5, 3);
  });
});
