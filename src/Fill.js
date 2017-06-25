module.exports = class Fill {
  constructor(patternType) {
    this.patternType = patternType;
  }

  getDataStructure() {
    return {
      tag: "fill",
      children: [
        {
          tag: "patternFill",
          props: {
            patternType: this.patternType
          }
        }
      ]
    };
  }
}
