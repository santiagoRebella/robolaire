const fs = require('fs');
const path = require('path');

/**
 * @description Read files synchronously from a folder, with natural sorting
 * @param {String} dir Absolute path to directory
 * @returns {Object[]} List of object, each object represent a file
 * structured like so: `{ filepath, name, ext, stat }`
 */
function readFilesSync(dir) {
  const letters = {};
  let all = [];

  fs.readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    //const content = fs.readFileSync(filepath, "latin1").toString().split('\n');
    const content = fs.readFileSync(filepath).toString().split('\n');

    if (isFile && name !== 'lemario') {
      letters[name] = { filepath, name, ext, stat, content };
      all = [...all, ...content];
    }
  });

  return {
    all,
    letters
  };
}

const dictionary = readFilesSync(__dirname + '/words');

module.exports = dictionary;
