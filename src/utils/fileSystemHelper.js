const path = require('path');
const fs = require('fs').promises;

const DATA_PATH = '../talker.json';

const readFile = async () => {
  const response = await fs.readFile(path.resolve(__dirname, DATA_PATH), 'utf-8');
  const data = JSON.parse(response);

  return data;
};

const writeFile = async (newData) => {
  const data = await readFile();
  let id = 0;
  data.forEach((item) => {
    if (item.id > id) {
      id = item.id;
    }
  });
  id += 1;
  await fs.writeFile(path
    .resolve(__dirname, DATA_PATH), JSON.stringify([...data, { id, ...newData }]));

  return { id, ...newData };
};

const simpleWriteFile = async (data) => {
  await fs.writeFile(path.resolve(__dirname, DATA_PATH), JSON.stringify(data));
};

module.exports = {
  readFile,
  writeFile,
  simpleWriteFile,
  // updateData
};