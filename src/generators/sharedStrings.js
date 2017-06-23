const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (stringMap) => {
  const strings = stringMap.map(el => {
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
        count: JSON.stringify(stringMap.length),
        uniqueCount: JSON.stringify(stringMap.length)
      },
      children: strings
    }
  ];

  return writeXML(data);
}
