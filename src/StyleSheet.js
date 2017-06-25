const links = require('./../utils/links');

const Font = require('./Font');
const Fill = require('./Fill');
const Border = require('./Border');
const CellXf = require('./CellXf');

module.exports = class StyleSheet {
  constructor() {
    this.fonts = [
      new Font(11, "Calibri", 2, "minor")
    ];
    this.fills = [
      new Fill("none"),
      new Fill("gray125")
    ];
    this.borders = [
      new Border()
    ];
    this.cellXfs = [
      new CellXf(0, 0, 0, 0, 0)
    ];
  }

  getDataStructure() {
    return {
      tag: "styleSheet",
      props: {
        "xmlns:x": links.sheet.main
      },
      children: [
        {
          tag: "fonts",
          props: {
            count: this.fonts.length,
            "x14ac:knownFonts": "1",
            "xmlns:x14ac": links.sheet.ac
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
