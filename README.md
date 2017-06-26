# node-create-excel

## Quickstart guide

```js
// Require the library
const Workbook = require("node-create-excel").Workbook;
const Table = require("node-create-excel").Table;

// Create a new workbook
const workbook = new Workbook({
  style: {
    fontSize: 22,
    fontColor: "FFFF0000",
    cellColor: "FF00FF00"
  },
  sheets: [
    'Sheet name'
  ]
});

// Update workbook
workbook.update([
  sheet: 0 // "Sheet name",
  cell: "A1",
  data: "My data",
  type: "string",
  style: {}
])

// Add table
const table = new Table({
  headers: [{
    name: "Name",
    type: "string",
    style: {}
  }],
  rows: [
    {
      type: "string",
      style: {},
    }, 
    {
      type(data, rowIndex, colIndex) {
        return (rowIndex % 2) ? "string" : "number"
      },
      style(data, rowIndex, colIndex) {
        return (rowIndex % 2) ? {fontColor: "red"} : {fontColor: "blue"}
      }
    }
  ],
  data: [
    ["Gunnar", 32, "Male"],
    ["Åge", 2, "Male"],
    ["Lise", 32, "Female"],
    ["Petter", 74, "Male"],
    ["Arne", 23, "Male"]
  ]
})

workbook.update([
  sheet: 0 // "Sheet name",
  cell: "A1",
  data: table
])

// Create file (defaults to current dir)
workbook.generate('build/example.xlsx');
```

### Styles
```js
{
  fontSize: 22,
  fontColor: "FFFFFFFF",
  bold: true,
  fillColor: "FFFFFFFF"
}
```
