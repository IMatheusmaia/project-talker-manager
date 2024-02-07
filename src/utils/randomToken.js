function randomToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const token = Array.from({ 
    length: 16,
  }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  console.log(token);
  return token;
}

module.exports = randomToken;
