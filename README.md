# node-create-excel

## Quickstart guide

```js
// Require the library
const Workbook = require("node-create-excel").Workbook;
const Table = require("node-create-excel").Table;
const { rgb, extend } = require('node-create-excel');

// Create a new workbook
const workbook = new Workbook({
  style: {
    fontSize: 22,
    fontColor: rgb("#FF0000"),
    fillColor: rgb("#0F0")
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

// Create base style if necessary
const commonTableStyle = {
  fontSize: 21
};

// Add table
const table = new Table({
  headers: [{
    name: "Name",
    type: "string",
    style: extend(commonTableStyle, {bold: true})
  }],
  rows: [
    {
      type: "string",
      style: {},
    },
    {
      type({data, row, col}) {
        return (row % 2) ? "string" : "number"
      },
      style({data, row, col}) {
        return (row % 2) ? {fontColor: "red"} : {fontColor: "blue"}
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
  fontColor: rgb("FFF"),
  bold: true,
  fillColor: rgb("FFF"),
  rowHeight: 20,
  colWidth: 15
}
```
