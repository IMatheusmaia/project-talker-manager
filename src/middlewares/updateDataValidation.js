// const { readFile, writeFile } = require('../utils/fileSystemHelper');

// const updateIsValid = async (req, res) => {
//   const { id } = req.params;
//   const { name, age, talk } = req.body;
//   const talkers = await readFile();
//   const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
//   if (talkerIndex === -1) {
//     return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//   }

//   talkers[talkerIndex] = { id: parseInt(id, 10), name, age, talk };
//   await writeFile(talkers);
//   res.status(200).json(talkers[talkerIndex]);
// };

// module.exports = updateIsValid;