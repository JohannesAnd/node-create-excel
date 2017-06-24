const Workbook = require('./src/workbook');

const excel = new Workbook();

const sheet1 = excel.createNewWorksheet("ark1");

sheet1.insertIntoCell("A1", 42,    "number");

excel.generateFile(__dirname + '/build/example.xlsx');
