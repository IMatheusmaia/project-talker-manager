const isValidEmail = (email, res) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  return regex.test(email);
};

function loginValidation(req, res, next) {
  const { email, password } = req.body;

  if (!isValidEmail(email, res)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === '' || password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = loginValidation;