const express = require('express');
const readFile = require('./utils/fileSystemHelper');
const randomToken = require('./utils/randomToken');
const loginValidation = require('./middlewares/loginValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online e rodando na porta ${PORT}!`);
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readFile();
    if (talkers.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ler o arquivo' });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFile();
    const found = data.find((item) => item.id === Number(id));
    if (typeof found === 'undefined') {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ler o arquivo' });
  }
});

app.post('/login', loginValidation, (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((item) => item === undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  return res.status(200).json({ token: randomToken() });
});