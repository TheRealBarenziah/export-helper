# export-helper  

Rather pretentious name for a tiny **nodejs** module that edits the last line of a file and turns `export = myModule;` into `default export myModule;` between tsc compilations (both ways supported).  

### Compatibility
node >= 10  

### Install  
`npm install export-helper`  

### Use  
```javascript
// helper.js
const exportHelper = require("export-helper");

exportHelper({ mode: "es6", path: "testFile.ts" })
  .then(res => res);
```  

```bash
$ node helper.js
$ npmjs/export-helper: "export = constant;" has successfully be replaced by "export default constant;" (testFile.ts)
```  
### Options
This function accepts an option object : 
```javascript
const options = { 
  mode: "es6", // available options: "es5", "es6"
  path: "testFile.ts", // path to file (no need ./)
  silent: false, // pass it to true to silent the console.log; false by default
  linesToTrim: 1 /* default to 1;
    you usually don't need to touch this, but if your IDE puts an extra blank line 
    between your module export and EOF, pass it to 2 and it should do the trick.
   */
};
```  

This async function is intended to be run between two TypeScript compilation.  
That means already having a complex "npm build" command with multiple `tsconfig.json` files and `tsc` calls.  
Interpolate something like the `node helper.js` shown above between them to alter your source code between compilations.  
  
The goal is to generate stuff that can be imported with either `require("module")` or `import module from "module`.  
  
In other words, this is to avoid asking people to `require("module").default` your module when they're just fine with the syntax of Old.  
  
Originally built for [another module](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/tsconfig-cjs.json)

# WIP, USE AT YOUR OWN PERIL !!!!!!!!!
# ... I MEAN IT !!!