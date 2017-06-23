const { cellToYX } = require('./../utils');

module.exports = class Worksheet {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  setPath(path) {
    this.path = path;
  }

  setWorksheetId(id) {
    this.sheetId = id;
  }

  setRelationshipId(id) {
    this.relationshipId = id;
  }

  insertIntoCell(cell, data, type) {
    const { y, x } = cellToYX(cell);

    if (y in this.data) {
      if (x in this.data[y]) {
        console.warn(`Overwriting data in cell ${cell} in sheet "${this.name}"`);
        this.data[y][x] = {cell, data, type};
      } else {
        this.data[y][x] = {cell, data, type};
      }
    } else {
      this.data[y] = {};
      this.data[y][x] = {cell, data, type};
    }
  }

  getData() {
    return this.data;
  }
}
