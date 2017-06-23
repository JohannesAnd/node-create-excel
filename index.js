const fs = require('fs');
const Workbook = require('./src/workbook');
const Worksheet = require('./src/worksheet');


const excel = new Workbook();

const sheet1 = excel.createNewWorksheet("ark1");

sheet1.insertIntoCell("B4", 42, "number");
sheet1.insertIntoCell("B5", "Heo", "string");
sheet1.insertIntoCell("B6", "Heo", "string");
sheet1.insertIntoCell("C5", "pa", "string");

excel.generateFile(__dirname + '/build/example.xlsx');
