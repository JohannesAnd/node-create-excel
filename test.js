const StyleSheet = require('./src/StyleSheet');
const writeXML = require('./utils/writeXML');

console.log(writeXML(new StyleSheet().getDataStructure()));
