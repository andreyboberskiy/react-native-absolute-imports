const path = require("path");
const { readdirSync, writeFileSync } = require("fs");
const isEqual = require("lodash/isEqual");

const redColor = "\x1b[31m";
const blueColor = "\x1b[36m";
const defaultColor = "\x1b[0m";

const pathToRoot = path.resolve(__dirname, "..", "..");

const setup = ({ tsEnabled, srcDirName } = {}) => {
  if (!srcDirName || typeof srcDirName !== "string") {
    return console.log(redColor, "Invalid srcDirName", defaultColor);
  }

  const generateAlias = () =>
    readdirSync(path.resolve(pathToRoot, srcDirName), { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .reduce((acc, dirent) => {
        acc[dirent.name] = `./${srcDirName}/${dirent.name}`;
        return acc;
      }, {});

  const alias = generateAlias();

  if (tsEnabled) {
    const tsConfig = require(path.resolve(pathToRoot, "tsconfig.json"));

    const newPaths = Object.keys(alias).reduce((acc, key) => {
      acc[key + "/*"] = [`${srcDirName}/${key}/*`];
      return acc;
    }, {});

    if (!isEqual(tsConfig.compilerOptions.paths, newPaths)) {
      tsConfig.compilerOptions.paths = newPaths;
      if (!tsConfig.compilerOptions.baseUrl) {
        tsConfig.compilerOptions.baseUrl = "./";
      }
      writeFileSync("./tsconfig.json", JSON.stringify(tsConfig, null, 2));

      console.log(blueColor, "Paths in tsconfig.json updated", defaultColor);
    }
  }

  return alias;
};

module.exports = setup;
