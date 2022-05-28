const editCodeString = (string, mode) => {
  let output;
  const stuffToExport = string.replace(
    /\bexport\b|\bdefault\b|\bas\b|=|;|\s/g,
    ""
  );
  const severalThingsToExport = stuffToExport.includes(",");
  const prettyStuff = Array.from(stuffToExport)
    .map((char) => {
      if (char === "{" || char === ",") return `${char} `;
      else if (char === "}") return ` ${char}`;
      else return char;
    })
    .join("");

  const prettyStuffWithBrackets = (string) =>
    string.includes("{") ? `${string};` : `{ ${prettyStuff} };`;

  if (mode === "es5") {
    output = `export = ${stuffToExport.replace(/{|}/g, "")};`;
  }
  if (mode === "es5:withbrackets") {
    output = `export = ${prettyStuffWithBrackets(prettyStuff)}`;
  }
  if (mode === "es6" || mode === "es6:named") {
    output = `export ${prettyStuffWithBrackets(prettyStuff)}`;
  }
  if (mode === "es6:default") {
    output = `export default ${prettyStuffWithBrackets(prettyStuff)}`;
  }
  if (mode === "es6:asDefault") {
    output = severalThingsToExport`export ${prettyStuff.replace(
      "}",
      "as default }"
    )};`;
  }
  return output;
};

module.exports = editCodeString;
