module.exports = class Worksheet {
  constructor(name) {
    this.name = name;
  }

  setPath(path) {
    this.path = path;
  }

  setWorksheetId(id) {
    this.sheetId = id;
  }

  setRelationshipId(id) {
    this.relationshipId = id;
  }

}
