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
// const updateData = async (id, talker) => {
//   const data = await readFile();
//   const newData = { id, ...talker };
//   const updatedData = data.reduce((acc, item) => {
//     if (item.id === id) {
//       return [...acc, newData];
//     }
//     return [...acc, item];
//   }, []);
//   await writeFile(updatedData);
//   return { id, ...talker };
// };

module.exports = {
  readFile,
  writeFile,
  simpleWriteFile,
  // updateData
};