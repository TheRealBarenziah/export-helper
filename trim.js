const fs = require('fs'), readLastLine = require('read-last-lines');

// Credits: https://stackoverflow.com/a/42466590/11894221

const trim = (path, linesToNuke) => new Promise((resolve, reject) => {
  return readLastLine.read(path, linesToNuke).then((lines) => {
    var to_vanquish = lines.length;
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      fs.truncate(path, stats.size - to_vanquish, (err) => {
        if (err) throw err;
      })
      resolve(null);
    });
  });
})

module.exports = trim;
