const fs = require("fs");

// Credits: https://nodejs.dev/learn/writing-files-with-nodejs#append-to-a-file

const append = (path, content) => new Promise((resolve, reject) => {
  return fs.appendFile(path, content, err => {
    if (err) {
      reject(err)
    }
    resolve(null)
  })
})

module.exports = append;