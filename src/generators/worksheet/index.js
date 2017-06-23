const template = require('./template');

module.exports = (worksheet, addSharedString) => {

  const cellData = worksheet.getData();

  const sheetData = Object.keys(cellData).sort().map(rowKey => {
    const row = cellData[rowKey];

    const columns = Object.keys(row).sort().map(columnKey => {
      const value = row[columnKey];
      switch (value.type) {
        case 'number':
          return {
            tag: "c",
            props: {
              r: value.cell,
              s: "0",
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
        customFormat: "false",
        ht: "12.8",
        hidden: "false",
        customHeight: "true",
        outlineLevel: "0",
        collapsed: "false"
      },
      children: columns
    }
  });

  return template(sheetData)
}
