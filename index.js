const Workbook = require('./src/workbook');

const excel = new Workbook();

const sheet1 = excel.createNewWorksheet("ark1");

sheet1.insertIntoCell("A1", 42,    "number");
sheet1.insertIntoCell("B4", 42,    "number");
sheet1.insertIntoCell("A3", 42,    "number");
sheet1.insertIntoCell("A4", "ehi", "string");


excel.generateFile(__dirname + '/build/example.xlsx');
