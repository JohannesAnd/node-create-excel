const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const contentTypesGenerator = require("./generators/contentTypes");
const relationshipsGenerator = require("./generators/workbookRels");
const worksheetGenerator = require("./generators/worksheet");
const workbookGenerator = require("./generators/workbook");

const Relationship = require('./relationship');
const Part = require('./part');

module.exports = class Workbook {
  constructor(){
    this.worksheets = [];
    this.styles = [];
    this.themes = [];
    this.relationships = [];
    this.partList = [
      new Part("xml", "workbook.xml")
    ];
  }

  _generateRelationship(type, path) {
    const id = `rId${this.relationships.length + 1}`;
    const rel = new Relationship(id, type, path);

    this.relationships.push(rel);

    return id;
  }

  addWorksheet(worksheet) {
    const path = `worksheets/sheet${this.worksheets.length + 1}.xml`;
    const rel = this._generateRelationship('worksheet', path);

    worksheet.setPath(path);
    worksheet.setWorksheetId(this.worksheets.length + 1);
    worksheet.setRelationshipId(rel);

    this.worksheets.push(worksheet);
    this.partList.push(new Part('worksheet', path));

    return rel;
  }

  addWorksheets(worksheets) {
    return worksheets.map(worksheet => this.addWorksheet(worksheet));
  }

  addStyle(style) {
    this.styles.push(style);
  }

  addTheme(theme) {
    this.themes.push(theme);
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

  _generateSheetsXML() {
    return this.worksheets.map(sheet => {
      return {
        path: sheet.path,
        xml: worksheetGenerator(sheet)
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

    this._generateSheetsXML().forEach(({path, xml}) => archive.append(xml, { name: "/xl/" + path }));

    archive.file(path.resolve(__dirname, 'assets', '.rels'), { name: "_rels/.rels" });

    archive.finalize();

    return output;
  }

}
