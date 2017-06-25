const links = require('./../utils/links');

const Font = require('./Font');
const Fill = require('./Fill');
const Border = require('./Border');
const CellXf = require('./CellXf');

module.exports = class StyleSheet {
  constructor() {
    this.fonts = [
      new Font(11, "Calibri", 2, "minor"),
      new Font(11, "Calibri", 2, "minor", {bold: true}),
    ];
    this.fills = [
      new Fill("none"),
      new Fill("gray125")
    ];
    this.borders = [
      new Border()
    ];
    this.cellXfs = [
      new CellXf(0, 0, 0, 0, 0),
      new CellXf(0, 1, 0, 0, 0)
    ];
  }

  getDataStructure() {
    return {
      tag: "styleSheet",
      props: {
        "xmlns": links.sheet.main,
        "xmlns:mc": links.sheet.mc,
        "mc:Ignorable": "x14ac x16r2",
        "xmlns:x14ac": links.sheet.ac,
        "xmlns:x16r2": links.sheet.main15
      },
      children: [
        {
          tag: "fonts",
          props: {
            count: this.fonts.length,
            "x14ac:knownFonts": "1"
          },
          children: this.fonts.map(f => f.getDataStructure())
        },
        {
          tag: "fills",
          props: {
            count: this.fills.length
          },
          children: this.fills.map(f => f.getDataStructure())
        },
        {
          tag: "borders",
          props: {
            count: this.borders.length
          },
          children: this.borders.map(b => b.getDataStructure())
        },
        {
          tag: "cellXfs",
          props: {
            count: this.cellXfs.length
          },
          children: this.cellXfs.map(c => c.getDataStructure())
        }
      ]
    };
  }
}
