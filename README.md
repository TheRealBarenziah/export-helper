# export-helper  

Pretentious name for a tiny **nodejs** module that edits the last line of a file.  
### Why ?  
It basically turns `export = myModule;` into `default export myModule;` between tsc compilations (both ways supported)  
Use it to compile into the syntax of Old (`require()`, NOT `require().default`) and a valid es6 module, in a single build command.  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/TheRealBarenziah/export-helper/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TheRealBarenziah/export-helper?targetFile=package.json)

### Compatibility
**node >= 10**  

### Install  
`npm install --save-dev export-helper`  

### Use  
Javascript file `helper.js`: 
```javascript
const exportHelper = require("export-helper");

exportHelper({ mode: "es6", path: "testFile.ts" })
  .then(res => res);
```  
In terminal:  
```bash
$ node helper.js
$ npmjs/export-helper: "export = constant;" has successfully be replaced by "export default constant;" (testFile.ts)
```  
### Options
This function accepts an option object :  
```javascript
const options = { 
  mode: "es6", // needed. Available options: "es5", "es6"
  path: "testFile.ts", // needed. Path to file (./ is optional)
  silent: false, // default to false; set to true to remove the log
  linesToTrim: 1 /* default to 1.
    You usually don't need this, but in case your IDE insert 
    an extra blank line between your module export and EOF, 
    incrementing that value should do the trick.
   */
};
```  

### ... more examples ?
This is the configuration on the [module](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master) I made this for.  
I have an utility file updateExport.js :  
```javascript
const exportHelper = require("export-helper");

const updateExport = () => {
  if (process.argv.slice(2)[0] === "es5") {
    exportHelper({ mode: "es5", path: "src/index.ts" }).then((res) => res);
  } else if (process.argv.slice(2)[0] === "es6") {
    exportHelper({ mode: "es6", path: "src/index.ts" }).then((res) => res);
  } else
    throw "Oopsie, it seems you forgot to pass either 'es5' or 'es6' as argument !";
};

updateExport();
```  
And this script in my package.json :  
```json
{ 
  ...
  "npm run build": "node rebuild.js && node updateExport.js es5 && tsc -p tsconfig-cjs.json && node updateExport.js es6 && tsc -p tsconfig.json" 
}
```  
- rebuild.js is a [simple utility](https://github.com/TheRealBarenziah/imgbb-uploader/blob/dev/rebuild.js) that wipes the /lib folder before compilation.  
- `node updateExport.js es5` : I wrapped my module into a function using `process.argv` to easily pass arguments to it.  
- `tsc -p tsconfig-cjs.json`: I'm calling tsc with [this config file](https://github.com/TheRealBarenziah/imgbb-uploader/blob/dev/tsconfig-cjs.json)  
- Now that I've compiled proper cjs with `module.exports`, I call `node updateExport.js es6` to change the source code once more.  
- Finally I call tsc to build the es6 module.  