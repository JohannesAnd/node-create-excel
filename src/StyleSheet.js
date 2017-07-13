const links = require('./../utils/links');
const extend = require('./../utils').extend;

const Font = require('./Font');
const Fill = require('./Fill');
const Border = require('./Border');
const CellXf = require('./CellXf');

module.exports = class StyleSheet {
  constructor(baseStyles) {
    this.baseStyles = baseStyles;
    this.fonts = [
      new Font({})
    ];
    this.fills = [
      new Fill({patternType: "none"}),
      new Fill({patternType: "gray125"})
    ];
    this.borders = [
      new Border()
    ];
    this.cellXfs = [
      new CellXf(0, 0, 0, 0)
    ];
    this.styles = {};
  }

  addStyle(opts) {
    const style = extend(this.baseStyles, opts);
    let numberFormat = 0;
    let font = 0;
    let fill = 0;
    let border = 0;

    if (style.bold || style.fontColor || style.fontSize) {
      font = this._addFont(style);
    }

    if (style.fillColor) {
      fill = this._addFill(style);
    }

    const stringed = this._stringify(style);
    let styleIndex = 0;

    if (this.styles[stringed]) {
      styleIndex = this.styles[stringed];
    } else {
      styleIndex = this._addCellXf(numberFormat, font, fill, border);
      this.styles[stringed] = styleIndex;
    }

    const rowHeight = style.rowHeight || style.fontSize * 1.4 || 14;
    const colWidth = style.colWidth;

    return {rowHeight, styleIndex, colWidth};
  }

  _stringify(opts) {
    let string = '';
    for (let key in opts) {
      string += `${key}:${opts[key]};`;
    }
    return string;
  }

  _addFont(opts) {
    return this.fonts.push(new Font(opts)) - 1;
  }


  _addFill(opts) {
    return this.fills.push(new Fill(opts)) - 1;
  }

  _addCellXf(...args) {
    return this.cellXfs.push(new CellXf(...args)) - 1;
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
