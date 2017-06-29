const {
  Workbook,
  Table,
  rgb
} = require('./index');

const excel = new Workbook({
  style: {
    fontSize: 22,
    fillColor: "FF00FF00"
  },
  sheets: [
    'Sheet name',
    'Sheet 2',
    'Sheet 4'
  ]
});

excel.update([
  {
    sheet: 0,
    cell: "A1",
    data: "hey",
    type: "string",
    style: {
      fontSize: 20,
      fontColor: rgb("#F00")
    }
  }
]);

const table = new Table({
  headers: [
    {name: "Navn", type: "string", style: {bold: true}}
  ],
  columns: [
    {type: "string", style: {}}
  ],
  data: [
    ["Gunnar"], ["Åge"], ["Nils"]
  ]
});

excel.update([
  {
    sheet: 0,
    cell: "B3",
    data: table
  }
]);

excel.generateFile('./build/example.xlsx');
