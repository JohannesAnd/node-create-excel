module.exports = {
  contentTypes: "http://schemas.openxmlformats.org/package/2006/content-types",
  rels: {
    relationships: "http://schemas.openxmlformats.org/package/2006/relationships",
    worksheet: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    styles: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
    theme: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme"
  },
  sheet: {
    relationships: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    main: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
    ac: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
  },
  parts: {
    xml: "application/xml",
    rels: "application/vnd.openxmlformats-package.relationships+xml",
    xml: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    worksheet: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    theme: "application/vnd.openxmlformats-officedocument.theme+xml",
    styles: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
  },
  workbook: {
    main: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    rels: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
    x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
  }
};
