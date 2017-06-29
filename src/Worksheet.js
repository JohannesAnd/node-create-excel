const { cellToColRow, colRowToCell } = require('./../utils');

const Table = require('./Table');


module.exports = class Worksheet {
  constructor(id, name, path, rel) {
    this.sheetId = id;
    this.name = name;
    this.path = path;
    this.relationshipId = rel;
    this.data = {};
  }

  update({cell, data, type, style, styleSheet}) {
    if ( data instanceof Table) {
      this._insertTable(cell, data, styleSheet);
    } else {
      this._insertIntoCell(cell, data, type, style, styleSheet);
    }
  }

  _insertIntoCell(cell, data, type, style, styleSheet) {
    const { col, row } = cellToColRow(cell);
    const computedType = typeof type === 'function' ? type({data, row, col}) : type;
    const computedStyle = typeof style === 'function' ? style({data, row, col}) : style;
    const entry = {
      cell,
      data,
      type: computedType,
      style: styleSheet.addStyle(computedStyle)
    };

    if (row in this.data) {
      if (col in this.data[row]) {
        console.warn(`Overwriting data in cell ${cell} in sheet "${this.name}"`);
        this.data[row][col] = entry;
      } else {
        this.data[row][col] = entry;
      }
    } else {
      this.data[row] = {};
      this.data[row][col] = entry;
    }
  }

  _insertTable(startCell, {headers, columns, data}, styleSheet) {
    const { col:startCol, row:startRow } = cellToColRow(startCell);

    for (let col = 0; col < headers.length; col++) {
      this._insertIntoCell(
        colRowToCell(col + startCol, startRow),
        headers[col].name,
        headers[col].type,
        headers[col].style,
        styleSheet
      );
    }
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col< headers.length; col++) {
        this._insertIntoCell(
          colRowToCell(col + startCol, row + startRow + 1),
          data[row][col],
          columns[col].type,
          columns[col].style,
          styleSheet
        );
      }
    }
  }

  getData() {
    return this.data;
  }
}
