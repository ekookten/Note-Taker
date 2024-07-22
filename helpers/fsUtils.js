const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Function to read data from a file and initialize with an empty array if empty
 * @param {string} filePath The path to the file you want to read from.
 * @returns {Promise} A promise that resolves to the file content or an empty array
 */
const readFromFile = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');
    if (!data) {
      await writeFile(filePath, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(filePath, JSON.stringify([]));
      return [];
    }
    throw err;
  }
};

/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content you want to write to the file.
 * @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 * Function to read data from a given file and append some content
 * @param {object} content The content you want to append to the file.
 * @param {string} file The path to the file you want to save to.
 * @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };