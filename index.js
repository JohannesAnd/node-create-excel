const fs = require('fs');
const Workbook = require('./src/workbook');
const Worksheet = require('./src/worksheet');


const excel = new Workbook();

const sheet1 = new Worksheet("Ark 1");
const sheet2 = new Worksheet("Ark 2");
const sheet3 = new Worksheet("Ark 3");

/*
const headerStyling = new Style({...});
const evenStyling = new Style({...});
const oddStyling = new Style({...});

const sheet4 = new Worksheet("Ark 4");

const beforeInsertionHeader = (content, row, col, opts) => {
  opts.style = headerStyling;
  return content;


const beforeInsertionHeader = (content, row, col, opts) => {
  opts.style = (row % 2) === (col % 2) ? evenStyling : oddStyling;
  return content;
}

const headers = [
  {
    type: 'string',
    content: 'Col1',
    beforeInsertionHeader: beforeInsertionHeader,
    beforeInsertionData: beforeInsertionData
  },
  {
    type: 'string',
    content: 'Col2',
    beforeInsertionHeader: beforeInsertionHeader,
    beforeInsertionData: beforeInsertionData
  }
];

const data = [
  ["hwy", "vvsdc"],
  ["fdsv", "fds"],
  ["fddds", "fdfds"]
];

sheet4.addTable(headers, data, "A4")
*/

const ids = excel.addWorksheets([sheet1, sheet2, sheet3]);

excel.generateFile(__dirname + '/build/example.xlsx');
