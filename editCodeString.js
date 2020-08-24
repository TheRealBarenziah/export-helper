const editCodeString = (string, isItIntoEs6) => {
  const output = isItIntoEs6 ? string.replace(/=/g, "default") : string.replace(/default/g, "=");
  return output;
}

module.exports = editCodeString;