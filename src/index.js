const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const randomToken = require('./utils/randomToken');

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

const DATA_PATH = './talker.json';

app.get('/talker', async (_req, res) => {
  try {
    const response = await fs.readFile(path.resolve(__dirname, DATA_PATH), 'utf-8');
    const talkers = JSON.parse(response);
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
    const response = await fs.readFile(path.resolve(__dirname, DATA_PATH), 'utf-8');
    const data = JSON.parse(response);
    const found = data.find((item) => item.id === Number(id));
    if (typeof found === 'undefined') {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ler o arquivo' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((item) => item === undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  return res.status(200).json({ token: randomToken() });
});