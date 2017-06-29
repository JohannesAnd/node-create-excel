const assert = require('assert');
const { extend } = require('./../../../utils');

describe("Extend style object with inheritance", () => {
  it("Should add new keys to empty objet", () => {
    assert.deepEqual(
      extend(
        {},
        {key: "red"}
      ),
      {key: "red"}
    );
  });
  it("Should add new keys to populated objet", () => {
    assert.deepEqual(
      extend(
        {key2: "blue"},
        {key: "red"}
      ),
      {key: "red", key2: "blue"}
    );
  });
  it("Should overwrite base object", () => {
    assert.deepEqual(
      extend(
        {key: "blue"},
        {key: "red"}
      ),
      {key: "red"}
    );
  });
});
