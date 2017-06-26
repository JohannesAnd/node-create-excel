const Workbook = require('./src/workbook');

const excel = new Workbook();

const sheet1 = excel.createNewWorksheet("ark1");

const normal = excel.addStyle();
const gray = excel.addStyle({ fillColor: "FFEEEEEE" });
const bold = excel.addStyle({
  bold: true,
  fontColor: "FFFF00FF",
  fontSize: 22,
  fillColor: "FFAAAAAA",
  rowHeight: 50
});

const makeBold = (data, row, col, opts) => {
  opts.style = bold;
  return data;
}

const striped = (data, row, col, opts) => {
  opts.style = (row % 2) ? normal : gray;
  return data;
}

const headers = [
  {data: "Name", headerType: "string", dataType: "string", headerStyle: bold, dataPreInsertion: striped},
  {data: "Age", headerType: "string", dataType: "number", headerStyle: bold, dataPreInsertion: striped},
  {data: "Gender", headerType: "string", dataType: "string", headerStyle: bold, dataPreInsertion: striped},
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
