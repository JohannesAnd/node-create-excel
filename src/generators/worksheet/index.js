const template = require('./template');

module.exports = (worksheet, addSharedString) => {

  const cellData = worksheet.getData();

  const sheetData = Object.keys(cellData).sort((a,b) => a - b).map(rowKey => {
    const row = cellData[rowKey];
    let highestCol = 0;
    const column = Object.keys(row).sort((a,b) => a - b).map(columnKey => {
      const value = row[columnKey];
      const opts = {style: {styleIndex: 0, rowHeight: 14}, type: value.type};
      let data = value.data;

      if (value.preInsertion) {
        data = value.preInsertion(data, rowKey, columnKey, opts);
      }

      if (opts.style.rowHeight > highestCol) highestCol = opts.style.rowHeight;

      switch (opts.type) {
        case 'number':
          return {
            tag: "c",
            props: {
              r: value.cell,
              s: opts.style.styleIndex,
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
              r: value.cell,
              s: opts.style.styleIndex,
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

  return template(sheetData)
}
