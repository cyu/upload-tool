#!/usr/bin/env node
const { server } = require("./standalone/server");
const helper = require("./standalone/helper");
const companion = require("./companion");
const { version } = require("../package.json");

function makeId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function cleanPathComponent(comp) {
  return comp.replace(/[^-A-Za-z0-9]$/g, "");
}

const options = helper.getCompanionOptions();
options.providerOptions.s3.getKey = (_req, filename, metadata) => {
  const { dir = "" } = metadata;
  const newFilename = [makeId(5), filename].join("-");
  const cleanDir = cleanPathComponent(dir);

  if (cleanDir && cleanDir.length) {
    return [cleanDir, newFilename].join("/");
  } else {
    return newFilename;
  }
};

const port = process.env.COMPANION_PORT || 3020;
const { app } = server(options);

companion.socket(app.listen(port));

console.log(`Welcome to Companion! v${version}`);
console.log(`Listening on http://0.0.0.0:${port}`);
