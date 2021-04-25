const fs = require("fs");

export function checkDirExist(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

export function getUploadFileExt(name: string) {
  let ext = name.split(".");
  return ext[ext.length - 1];
}
