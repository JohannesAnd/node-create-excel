module.exports = class Font {
  constructor(size, name, family, scheme) {
    this.size = size;
    this.name = name;
    this.family = family;
    this.scheme = scheme;
  }

  getDataStructure() {
    return {
      tag: "font",
      children: [
        {
          tag: "sz",
          props: {
            val: this.size
          }
        },
        {
          tag: "name",
          props: {
            val: this.name
          }
        },
        {
          tag: "family",
          props: {
            val: this.family
          }
        },
        {
          tag: "scheme",
          props: {
            val: this.scheme
          }
        }
      ]
    };
  }
}
