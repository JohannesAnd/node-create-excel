const { cellToColRow } = require('./../utils');

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
    const { col, row } = cellToColRow(cell);

    if (row in this.data) {
      if (col in this.data[row]) {
        console.warn(`Overwriting data in cell ${cell} in sheet "${this.name}"`);
        this.data[row][col] = {cell, data, type};
      } else {
        this.data[row][col] = {cell, data, type};
      }
    } else {
      this.data[row] = {};
      this.data[row][col] = {cell, data, type};
    }
  }

  getData() {
    return this.data;
  }
}
