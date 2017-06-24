const Workbook = require('./src/workbook');

const excel = new Workbook();

const sheet1 = excel.createNewWorksheet("ark1");

const headers = [
  {data: "Name", headerType: "string", dataType: "string"},
  {data: "Age", headerType: "string", dataType: "number"},
  {data: "Gender", headerType: "string", dataType: "string"},
];

const data = [
  ["Gunnar", 32, "Male"],
  ["Åge", 2, "Male"],
  ["Lise", 32, "Female"],
  ["Petter", 74, "Male"],
  ["Arne", 23, "Male"],
];

sheet1.insertIntoCell("B2", "My people:", "string");
sheet1.insertTable("B4", headers, data);
sheet1.insertTable("B12", headers, data);


excel.generateFile(__dirname + '/build/example.xlsx');
