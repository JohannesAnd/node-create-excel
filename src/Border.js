module.exports = class Border {
  constructor(left, right, top, bottom, diagonal) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.diagonal = diagonal;
  }

  getDataStructure() {
    return {
      tag: "border",
      children: [
        {
          tag: "left"
        },
        {
          tag: "right"
        },
        {
          tag: "top"
        },
        {
          tag: "bottom"
        },
        {
          tag: "diagonal"
        },
      ]
    };
  }
}
