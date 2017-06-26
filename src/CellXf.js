module.exports = class CellXf {
  constructor(numberFormatId, fontId, fillId, borderId) {
    this.numberFormatId = numberFormatId || 0;
    this.fontId = fontId || 0;
    this.fillId = fillId || 0;
    this.borderId = borderId || 0;
  }

  getDataStructure() {
    return {
      tag: "xf",
      props: {
        numFmtId: this.numberFormatId,
        fontId: this.fontId,
        fillId: this.fillId,
        borderId: this.borderId,
        applyNumberFormat: this.numberFormatId !== 0 ? "1" : "0",
        applyFont: this.fontId !== 0 ? "1" : "0",
        applyFill: this.fillId !== 0 ? "1" : "0"
      }
    };
  }
}
