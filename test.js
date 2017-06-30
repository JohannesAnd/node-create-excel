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
    {name: "Navn", type: "string", style: {bold: true, colWidth: 20}}
  ],
  columns: [
    {
      type: "string",
      style({col, row}) {
        return (row % 2) ? {fillColor: rgb("#AAA")} : {fillColor: rgb("#FFF")};
      }
    }
  ],
  data: [
    ["Gunnar"], ["Åge"], ["Nils"], ["Gunnar"], ["Åge"], ["Nils"]
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
