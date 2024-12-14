const fs = require('fs');

/**
 * 递归遍历，获取指定文件夹下面的所有文件路径
 */
function getAllFiles(filePath) {
  let allFilePaths = [];
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    for (let i = 0; i < files.length; i++) {
      let file = files[i]; // 文件名称（不包含文件路径）
      let currentFilePath = filePath + '/' + file;
      let stats = fs.lstatSync(currentFilePath);
      if (stats.isDirectory()) {
        allFilePaths.push({
          dirName: file,
          path: currentFilePath,
        });
      }
    }
  } else {
    console.warn(`指定的目录${filePath}不存在！`);
  }

  return allFilePaths;
}

module.exports = function readFiles(srcDir) {
  let allFiles = getAllFiles(srcDir);
  return allFiles;
};
