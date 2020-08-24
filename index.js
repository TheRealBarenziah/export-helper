const readLastLines = require('read-last-lines');
const trim = require("./trim");
const append = require("./append");
const editCodeString = require("./editCodeString");

/**
 * Trim the end of selected file and update the export syntax.
 * @param {Object} options
 * @param {String} options.mode  "es5" or "es6"
 * @param {String} options.path Valid path to file
 * @param {Boolean} options.silent Prints a console.log if false. Default to false.
 * @param {Number} options.linesToTrim Lines to trim. Default to 1.
 * @example
 *     exportHelper({ mode: "es6", path: "testFile.ts"})
 *       .then(res => res)
 *       .catch(err => err)
 * @return {null} null
 */

const exportHelper = async (options) => {
  const { mode, path, silent = false, linesToTrim = 1 } = { ...options };

  return readLastLines.read(path, linesToTrim)
    .then(async (res) => {

      if (mode === "es5") {
        await trim(path, linesToTrim);
        const newString = await editCodeString(res, false);
        await append(path, await newString);
        if (!silent) {
          console.log(`npmjs/export-helper: "${res}" has successfully been replaced by "${newString}" (${path})`)
        }
        return null;
      }

      if (mode === "es6") {
        await trim(path, linesToTrim);
        const newString = await editCodeString(res, true);
        await append(path, await newString);
        if (!silent) {
          console.log(`npmjs/export-helper: "${res}" has successfully be replaced by "${newString}" (${path})`)
        }
        return null;
      }
    })
}

module.exports = exportHelper;