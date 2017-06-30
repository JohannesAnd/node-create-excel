module.exports = columnWidths => {
  const defaultWidth = "10.719387755102";
  const colsData = [];
  let currentCol = 1;

  Object.keys(columnWidths).forEach(col => {
    if (col > currentCol) {
      colsData.push({min: currentCol, max: col - 1, width: defaultWidth})
      currentCol = col;
    }
    colsData.push({min: col, max: col, width: columnWidths[col]});
    currentCol++;
  });

  colsData.push({min:currentCol, max: "1025", width: defaultWidth})

  return colsData;
};
