module.exports = class Fill {
  constructor({patternType, fillColor}) {
    this.patternType = patternType || "solid";
    this.fgColor = fillColor || false;
  }

  getDataStructure() {
    const data = {
      tag: "fill",
      children: [
        {
          tag: "patternFill",
          props: {
            patternType: this.patternType
          },
          children: []
        }
      ]
    };

    if (this.fgColor) {
      data.children[0].children.push({
        tag: "fgColor",
        props: {
          rgb: this.fgColor
        }
      });
    }

    return data;
  }
}
