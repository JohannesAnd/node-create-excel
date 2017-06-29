module.exports = class Table {
  constructor({headers, columns, data}) {
    this.headers = headers;
    this.columns = columns;
    this.data = data;
  }
}
