module.exports = class Font {
  constructor(size, name, family, scheme, opts) {
    this.size = size;
    this.name = name;
    this.family = family;
    this.scheme = scheme;
    this.opts = opts || {};
  }

  getDataStructure() {
    const data = {
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

    if (this.opts.bold) {
      data.children.push({
        tag: "b"
      });
    }

    return data;
  }
}
