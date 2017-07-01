const { cellToColRow, colRowToCell } = require('./index');

module.exports = (cell, {col: colOffset, row: rowOffset}) => {
  const { col, row } = cellToColRow(cell);

  const newCol = Math.max(1, col + colOffset);
  const newRow = Math.max(1, row + rowOffset);

  return colRowToCell(newCol, newRow);
};
