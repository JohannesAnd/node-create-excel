module.exports = class Font {
  constructor({fontSize, fontName, fontFamily, fontScheme, bold, fontColor}) {
    this.fontSize = fontSize || 11;
    this.fontName = fontName || "Calibri";
    this.fontFamily = fontFamily || 2;
    this.fontScheme = fontScheme || "minor";
    this.bold = bold || false;
    this.fontColor = fontColor || false;
  }

  getDataStructure() {
    const data = {
      tag: "font",
      children: [
        {
          tag: "sz",
          props: {
            val: this.fontSize
          }
        },
        {
          tag: "name",
          props: {
            val: this.fontName
          }
        },
        {
          tag: "family",
          props: {
            val: this.fontFamily
          }
        },
        {
          tag: "scheme",
          props: {
            val: this.fontScheme
          }
        }
      ]
    };

    if (this.bold) {
      data.children.push({
        tag: "b"
      });
    }

    if (this.fontColor) {
      data.children.push({
        tag: "color",
        props: {
          rgb: this.fontColor
        }
      });
    }

    return data;
  }
}
