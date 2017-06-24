const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (stringMap, stringsCountTotal) => {
  const strings = Object.keys(stringMap);
  const stringArray = strings.map(el => {
    return {
      tag: "si",
      children: [
        {
          tag: "t",
          content: el
        }
      ]
    };
  });

  const data = [
    {
      tag: "sst",
      props: {
        xmlns: links.workbook.main,
        count: JSON.stringify(stringsCountTotal),
        uniqueCount: JSON.stringify(strings.length)
      },
      children: stringArray
    }
  ];

  return writeXML(data);
}
