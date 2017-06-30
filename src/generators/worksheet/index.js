const { generateColumnWidths } = require('./../../../utils');

const template = require('./template');

module.exports = (worksheet, addSharedString) => {

  const cellData = worksheet.getData();

  const columnWidths = {};

  const sheetData = Object.keys(cellData).sort((a,b) => a - b).map(rowKey => {
    const row = cellData[rowKey];
    let highestCol = 0;
    const column = Object.keys(row).sort((a,b) => a - b).map(columnKey => {
      const {type, cell, data, style} = row[columnKey];
      if (style.rowHeight > highestCol) highestCol = style.rowHeight;
      if ((
          !columnWidths[columnKey]
          || style.colWidth > columnWidths[columnKey])
        && style.colWidth
      ) columnWidths[columnKey] = style.colWidth;

      switch (type) {
        case 'number':
          return {
            tag: "c",
            props: {
              r: cell,
              s: style.styleIndex || 0,
              t: "n"
            },
            children: [
              {
                tag: "v",
                content: JSON.stringify(data)
              }
            ]
          };
          break;
        case 'string':
          const stringIndex = addSharedString(data)
          return {
            tag: "c",
            props: {
              r: cell,
              s: style.styleIndex || 0,
              t: "s"
            },
            children: [
              {
                tag: "v",
                content: JSON.stringify(stringIndex)
              }
            ]
          };
          break;
      }
    });

    return {
      tag: "row",
      props: {
        r: rowKey,
        "x14ac:dyDescent": "0.25",
        ht: highestCol
      },
      children: column
    }
  });

  const columnWidthsData = generateColumnWidths(columnWidths).map(el => {
    return {
      tag: "col",
      props: el
    };
  });

  return template(sheetData, columnWidthsData);
}
