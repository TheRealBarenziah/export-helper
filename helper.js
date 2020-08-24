const alterExportSourceCode = require("./index");

alterExportSourceCode({ mode: "es5", path: "testFile.ts"})
  .then(res => res);