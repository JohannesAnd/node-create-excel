const links = require('./../../../utils/links');
const writeXML = require('./../../../utils/writeXML');

module.exports = sheetData => {
  const data = [
    {
      tag: "worksheet",
      props: {
        xmlns: links.sheet.main,
        "xmlns:r": links.sheet.relationships,
        "xmlns:mc": links.sheet.mc,
        "mc:Ignorable": "x14ac",
        "xmlns:x14ac": links.sheet.ac
      },
      children: [
        {
          tag: "sheetData",
          children: sheetData
        },
        {
          tag: "pageMargins",
          props: {
            left: "0.7",
            right: "0.7",
            top: "0.7",
            bottom: "0.7",
            header: "0.3",
            footer: "0.3"
          }
        }
      ]
    }
  ];

  return writeXML(data);
}
