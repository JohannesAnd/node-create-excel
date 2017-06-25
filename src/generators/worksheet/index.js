const template = require('./template');

module.exports = (worksheet, addSharedString) => {

  const cellData = worksheet.getData();

  const sheetData = Object.keys(cellData).sort((a,b) => a - b).map(rowKey => {
    const row = cellData[rowKey];

    const column = Object.keys(row).sort((a,b) => a - b).map(columnKey => {
      const value = row[columnKey];
      switch (value.type) {
        case 'number':
          return {
            tag: "c",
            props: {
              r: value.cell,
              s: "1",
              t: "n"
            },
            children: [
              {
                tag: "v",
                content: JSON.stringify(value.data)
              }
            ]
          };
          break;
        case 'string':
          const stringIndex = addSharedString(value.data)
          return {
            tag: "c",
            props: {
              r: value.cell,
              s: "0",
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
        "x14ac:dyDescent": "0.25"
      },
      children: column
    }
  });

  return template(sheetData)
}
