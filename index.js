const readLastLines = require("read-last-lines");
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

  return readLastLines.read(path, linesToTrim).then(async (res) => {
    const log = (oldString, newString) =>
      console.log(
        `npmjs/export-helper: "${oldString.replace(
          "\n",
          ""
        )}" has successfully been replaced by "${newString.replace(
          "\n",
          ""
        )}" (${path})`
      );

    let newString;
    await trim(path, linesToTrim);

    if (mode === "es5") {
      newString = await editCodeString(res, "es5");
    } else if (mode === "es5:withbrackets") {
      newString = await editCodeString(res, "es5:withbrackets");
    } else if (mode === "es6" || mode === "es6:named") {
      newString = await editCodeString(res, "es6:named");
    } else if (mode === "es6:default") {
      newString = await editCodeString(res, "es6:default");
    } else if (mode === "es6:asDefault") {
      newString = await editCodeString(res, "es6:asDefault");
    } else {
      throw new Error(
        "'mode' value must be one of: es5, es6, es6:default, es6:named, es6:asDefault"
      );
    }

    await append(path, await newString);
    if (!silent) log(res, newString);
    return null;
  });
};

module.exports = exportHelper;
