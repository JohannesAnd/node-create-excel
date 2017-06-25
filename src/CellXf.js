module.exports = class CellXf {
  constructor(numberFormatId, fontId, fillId, borderId, xfId) {
    this.numberFormatId = numberFormatId || 0;
    this.fontId = fontId || 0;
    this.fillId = fillId || 0;
    this.borderId = borderId || 0;
    this.xfId = xfId || 0;
  }

  getDataStructure() {
    return {
      tag: "xf",
      props: {
        numFmtId: this.numberFormatId,
        fontId: this.fontId,
        fillId: this.fillId,
        borderId: this.borderId,
        xfId: this.xfId
      }
    };
  }
}
