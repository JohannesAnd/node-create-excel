# node-create-excel

## Quickstart guide

### Create a sheet

```js

// Require the library
const nodeCreateExcel = require("node-create-excel");

// Create a new excel file
const workbook = new nodeCreateExcel();

// Add a sheet to the workbook
const sheet1 = workbook.createNewWorksheet("Sheet name");
```

### Add styles

```js

const myStyle = workbook.addStyle({
  fontSize: 22,
  fontColor: "FFFF0000",
  cellColor: "FF00FF00"
});

const grayStyle = workbook.addStyle({
  fontSize: 22,
  fontColor: "FFFF0000",
  cellColor: "FF00FF00"
});
```

### Insert data into sheet

```js

sheet1.insertIntoCell("A1", "My data", "string", myStyle)

```

### Add a table

```js

// Create preInsertion function for data
const dataPreInsertion = (data, row, col, opts) => {
  opts.style = (row % 2) ? myStyle : grayStyle
  return data;
}

// Define table headers and their types
const headers = [
  {data: "Name", headerType: "string", dataType: "string", headerStyle: myStyle, dataPreInsertion: striped},
  {data: "Age", headerType: "string", dataType: "number", headerStyle: myStyle, dataPreInsertion: striped},
  {data: "Gender", headerType: "string", dataType: "string", headerStyle: myStyle, dataPreInsertion: striped},
];

// Define data for the table
const data = [
  ["Gunnar", 32, "Male"],
  ["Åge", 2, "Male"],
  ["Lise", 32, "Female"],
  ["Petter", 74, "Male"],
  ["Arne", 23, "Male"],
];

// Insert the table into the sheet
sheet1.insertTable("B4", headers, data);
```

### Generate file

```js

excel.generateFile(__dirname + '/build/example.xlsx');
```

## API Docs

### PreInsertion-function
```js

function preInsertion(data, row, col, opts) {
  // Modify styling and data based on row, col and data
  opts.style = myStyle;
  opts.type = "string";

  return data;
}
```
The preInsertion function is run on the data before it is inserted into the spreadsheet. You can modify the styling based on row-number, or parse the data before it is entered

### Styles
```js

const myStyle = workbook.addStyle({
  fontSize: 22,
  fontColor: "FFFFFFFF",
  bold: true,
  fillColor: "FFFFFFFF"
});
```

### Header definitions
```js

const header = [
  {
    data: "Name",             // What to show in the cell
    headerType: "string",     // Datatype of header
    dataType: "string",       // Datatype of data
    headerStyle: myStyle,     // Assign style to header
    dataStyle: myStyle,       // Assign style to data
    headerPreInsertion: hPre, // Use preInsertion function on headers, overrrides headerStyle
    dataPreInsertion: dPre    // Use preInsertion function on data, overrides dataStyles
  }
]
```
