const links = require('./../../utils/links');
const writeXML = require('./../../utils/writeXML');

module.exports = (rels) => {
  const relationships = rels.reverse().map(rel => {
    return {
      tag: "Relationship",
      props: {
        Id: rel.id,
        Type: links.rels[rel.type],
        Target: rel.path
      }
    };
  });

  const data = [
    {
      tag: "Relationships",
      props: {
        xmlns: links.rels.relationships
      },
      children: relationships
    }
  ];

  return writeXML(data);
}
