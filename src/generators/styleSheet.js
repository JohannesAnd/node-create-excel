const writeXML = require('./../../utils/writeXML');

module.exports = (styleSheet) => {
  return writeXML(styleSheet.getDataStructure());
}
