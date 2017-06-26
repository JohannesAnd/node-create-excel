const { cellToColRow, colRowToCell } = require('./../utils');

function generatePreInsertion(style) {
  return function setStyle(data, row, col, opts) {
    opts.style = style;
    return data;
  }
}

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

  insertIntoCell(cell, data, type, preInsertion) {
    const { col, row } = cellToColRow(cell);

    if (row in this.data) {
      if (col in this.data[row]) {
        console.warn(`Overwriting data in cell ${cell} in sheet "${this.name}"`);
        this.data[row][col] = {cell, data, type, preInsertion};
      } else {
        this.data[row][col] = {cell, data, type, preInsertion};
      }
    } else {
      this.data[row] = {};
      this.data[row][col] = {cell, data, type, preInsertion};
    }
  }

  insertTable(startCell, headers, data) {
    const { col:startCol, row:startRow } = cellToColRow(startCell);

    for (let col = 0; col < headers.length; col++) {
      this.insertIntoCell(
        colRowToCell(col + startCol, startRow),
        headers[col].data,
        headers[col].headerType,
        headers[col].headerPreInsertion || generatePreInsertion(headers[col].headerStyle)
      );
    }
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col< headers.length; col++) {
        this.insertIntoCell(
          colRowToCell(col + startCol, row + startRow + 1),
          data[row][col],
          headers[col].dataType,
          headers[col].dataPreInsertion || generatePreInsertion(headers[col].dataStyle)
        );
      }
    }
  }

  getData() {
    return this.data;
  }
}
