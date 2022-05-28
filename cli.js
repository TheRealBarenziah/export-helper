#!/usr/bin/env node
const exportHelper = require("./index");

const updateExport = () => {
  const argv = process.argv.slice(2);
  if (!argv[1]) throw "Oopsie, you need to pass a file path as 2nd argument !";
  if (argv[0] === "es5") {
    exportHelper({
      mode: "es5",
      path: argv[1],
      silent: argv[2] ? false : true,
    }).then((res) => res);
  } else if (argv[0] === "es6") {
    exportHelper({
      mode: "es6",
      path: argv[1],
      silent: argv[2] ? false : true,
    }).then((res) => res);
  } else
    throw "Oopsie; did you pass 'es5' or 'es6' as 1st argument & a file path as 2nd argument?";
};

if (require.main === module) {
  updateExport();
}
