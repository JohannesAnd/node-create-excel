const template = require('./template');

module.exports = (worksheet, addSharedString) => {

  const cellData = worksheet.getData();

  const sheetData = Object.keys(cellData).sort((a,b) => a - b).map(rowKey => {
    const row = cellData[rowKey];

    const column = Object.keys(row).sort((a,b) => a - b).map(columnKey => {
      const value = row[columnKey];
      const opts = {style: 0, type: value.type};
      let data = value.data;

      if (value.preInsertion) {
        data = value.preInsertion(data, rowKey, columnKey, opts);
      }
      switch (opts.type) {
        case 'number':
          return {
            tag: "c",
            props: {
              r: value.cell,
              s: opts.style,
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
              s: opts.style,
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
        autoFitHeight: "1"
      },
      children: column
    }
  });

  return template(sheetData)
}
