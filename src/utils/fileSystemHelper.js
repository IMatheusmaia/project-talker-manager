const path = require('path');
const fs = require('fs').promises;

const DATA_PATH = '../talker.json';

const readFile = async () => {
  const response = await fs.readFile(path.resolve(__dirname, DATA_PATH), 'utf-8');
  const data = JSON.parse(response);

  return data;
};

module.exports = readFile;