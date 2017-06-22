const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (sheetData = []) => {
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
          tag: "dimension",
          props: {
            ref: "A1"
          }
        },
        {
          tag: "sheetViews",
          children: [
            {
              tag: "sheetView",
              props: {
                tabSelected: "1",
                workbookViewId: "0"
              }
            }
          ]
        },
        {
          tag: "sheetFormatPr",
          props: {
            baseColWidth: "10",
            defaultRowHeight: "15",
            "x14ac:dyDescent": "0.25"
          }
        },
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
