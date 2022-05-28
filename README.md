# export-helper

Pretentious name for a tiny **nodejs** module that edits the last line of a file.

### Why ?

It basically turns `export = myModule;` into `export { myModule };` between tsc compilations (both ways supported)  
Use it to compile into the syntax of Old (`require()`, NOT `require().default`) and a valid es6 module, in a single build command.  
[![https://nodei.co/npm/export-helper.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/export-helper.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/export-helper)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/TheRealBarenziah/export-helper/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TheRealBarenziah/export-helper?targetFile=package.json)

### Compatibility

**node >= 10**

### Install

`npm install --save-dev export-helper`

### Use (CLI)

```bash
npx export-helper es5 index.ts
```

- first argument can be either "es5" or "es6"
- second argument is target file path
- accepts an optional 'verbose' 3rd param, that enables a log:

```bash
npx export-helper es6 testFile.ts verbose
# npmjs/export-helper: "export = constant;" has successfully been replaced by "export { constant };" (testFile.ts)
```

### Use (from JS)

Javascript file `helper.js`:

```javascript
const exportHelper = require("export-helper");

exportHelper({ mode: "es6", path: "testFile.ts" }).then((res) => res);
```

In terminal:

```bash
$ node helper.js
$ npmjs/export-helper: "export = constant;" has successfully been replaced by "export { constant };" (testFile.ts)
```

### Options

This function accepts an option object :

```javascript
const options = {
  mode: "es6", // needed. Available options: "es5", "es6". Untested options: "es5:withbrackets", "es6:default", "es6asDefault"
  path: "testFile.ts", // needed. Path to file (./ is optional)
  silent: false, // default to false; set to true to remove the log
  linesToTrim: 1 /* default to 1.
    You usually don't need this, but in case your IDE insert 
    an extra blank line between your module export and EOF, 
    incrementing that value should do the trick.
   */,
};
```

### ... more examples ?

This script in my package.json :

```json
{
  ...
  "npm run build": "node rebuild.js && npx export-helper es5 src/index.ts && tsc -p tsconfig-cjs.json && px export-helper es6 src/index.ts  && tsc -p tsconfig.json"
}
```

- rebuild.js is a [simple utility](https://github.com/TheRealBarenziah/imgbb-uploader/blob/dev/rebuild.js) that wipes the /lib folder before compilation.
- `tsc -p tsconfig-cjs.json`: I'm calling tsc with [this config file](https://github.com/TheRealBarenziah/imgbb-uploader/blob/dev/tsconfig-cjs.json)
- Now that I've compiled proper cjs with `module.exports`, I call `npx export-helper es6 src/index.ts ` to change the source code once more.
- Finally I call tsc to build the es6 module.
