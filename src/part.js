const links = require('./../utils/links');

module.exports = class Part {
  constructor(type, path) {
    this.partName = path;
    this.type = links.parts[type];
  }
}
