const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (parts) => {
  const partsData = parts.map(part => {
    return {
      tag: "Override",
      props: {
        PartName: "/xl/" + part.partName,
        ContentType: part.type
      }
    };
  });

  const data = [
    {
      tag: "Types",
      props: {
        xmlns: links.contentTypes
      },
      children: [
        {
          tag: "Default",
          props: {
            Extension: "rels",
            ContentType: links.parts.rels
          }
        },
        {
          tag: "Default",
          props: {
            Extension: "xml",
            ContentType: "application/xml"
          }
        }
      ].concat(partsData)
    }
  ];

  return writeXML(data);
}
