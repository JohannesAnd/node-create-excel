const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (sheets) => {
  const sheetsData = sheets.map(sheet => {
    return {
      tag: "sheet",
      props: {
        name: sheet.name,
        sheetId: sheet.sheetId,
        "r:id": sheet.relationshipId
      }
    };
  });

  const data = [
    {
      tag: "workbook",
      props: {
        xmlns: links.workbook.main,
        "xmlns:r": links.workbook.rels,
        "xmlns:mc": links.workbook.mc,
        "mc:Ignorable": "x15",
        "xmlns:x15": links.workbook.x15
      },
      children: [
        {
          tag: "sheets",
          children: sheetsData
        }
      ]
    }
  ];

  return writeXML(data);
}
