const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const Worksheet = require('./Worksheet');

const sharedStringsGenerator = require("./generators/sharedStrings");
const contentTypesGenerator = require("./generators/contentTypes");
const relationshipsGenerator = require("./generators/workbookRels");
const worksheetGenerator = require("./generators/worksheet");
const workbookGenerator = require("./generators/workbook");
const styleSheetGenerator = require("./generators/styleSheet");

const Relationship = require('./Relationship');
const StyleSheet = require('./StyleSheet');
const Part = require('./Part');

module.exports = class Workbook {
  constructor({style = {}, sheets = []} = {}){
    this.worksheets = [];
    this.styles = [];
    this.themes = [];
    this.styleSheet = new StyleSheet(style);
    this.relationships = [
      new Relationship("rId1", "sharedStrings", "sharedStrings.xml"),
      new Relationship("rId2", "styles", "styles.xml"),
    ];
    this.partList = [
      new Part("xml", "/xl/workbook.xml"),
      new Part("strings", "/xl/sharedStrings.xml"),
      new Part("styles", "/xl/styles.xml"),
      new Part("app", "/docProps/app.xml"),
      new Part("core", "/docProps/core.xml"),
    ];
    this.sharedStrings = {};
    this.sharedStringsCount = 0;

    sheets.forEach(name => this._createNewWorksheet(name));
  }

  update(updates) {
    updates.forEach(update => this._updateSingle(update));
  }

  _updateSingle(opts) {
    opts.styleSheet = this.styleSheet;
    this.worksheets[opts.sheet].update(opts);
  }

  _generateRelationship(type, path) {
    const id = `rId${this.relationships.length + 1}`;
    const rel = new Relationship(id, type, path);

    this.relationships.push(rel);

    return id;
  }

  _createNewWorksheet(name) {
    const path = `worksheets/sheet${this.worksheets.length + 1}.xml`;
    const rel = this._generateRelationship('worksheet', path);

    const worksheet = new Worksheet(this.worksheets.length + 1, name, path, rel);

    this.worksheets.push(worksheet);
    this.partList.push(new Part('worksheet', "/xl/" + path));

    return worksheet;
  }

  _addSharedString(string) {
    this.sharedStringsCount ++;

    if (string in this.sharedStrings) {
      return this.sharedStrings[string];
    }
    const i = Object.keys(this.sharedStrings).length;

    this.sharedStrings[string] = i;

    return i;
  }

  _generateContentTypesXML() {
    return contentTypesGenerator(this.partList);
  }

  _generateRelationshipsXML() {
    return relationshipsGenerator(this.relationships);
  }

  _generateWorkbookXML() {
    return workbookGenerator(this.worksheets);
  }

  _generateSharedStringsXML() {
    return sharedStringsGenerator(this.sharedStrings, this.sharedStringsCount);
  }

  _generateStyleSheetXML() {
    return styleSheetGenerator(this.styleSheet);
  }

  _generateSheetsXML() {
    return this.worksheets.map(sheet => {
      return {
        path: sheet.path,
        xml: worksheetGenerator(sheet, this._addSharedString.bind(this))
      };
    });
  }

  generateFile(outputPath) {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    archive.pipe(output);

    archive.append(this._generateContentTypesXML(),  { name: "[Content_Types].xml" });
    archive.append(this._generateRelationshipsXML(), { name: "/xl/_rels/workbook.xml.rels" });
    archive.append(this._generateWorkbookXML(),      { name: "/xl/workbook.xml", });
    archive.append(this._generateStyleSheetXML(),    { name: "/xl/styles.xml", });

    this._generateSheetsXML().forEach(({path, xml}) => archive.append(xml, { name: "/xl/" + path }));

    archive.append(this._generateSharedStringsXML(), { name: "/xl/sharedStrings.xml", });

    archive.file(path.resolve(__dirname, 'assets', '.rels'),      { name: "_rels/.rels" });
    archive.file(path.resolve(__dirname, 'assets', 'app.xml'),    { name: "docProps/app.xml" });
    archive.file(path.resolve(__dirname, 'assets', 'core.xml'),   { name: "docProps/core.xml" });

    archive.finalize();

    return output;
  }
}
