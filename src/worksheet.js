const { cellToColRow, colRowToCell } = require('./../utils');

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

  insertTable(startCell, headers, data) {
    const { col:startCol, row:startRow } = cellToColRow(startCell);

    for (let col = 0; col < headers.length; col++) {
      this.insertIntoCell(colRowToCell(col + startCol, startRow), headers[col].data, headers[col].headerType);
    }
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col< headers.length; col++) {
        this.insertIntoCell(colRowToCell(col + startCol, row + startRow + 1), data[row][col], headers[col].dataType);
      }
    }
  }

  getData() {
    return this.data;
  }
}
