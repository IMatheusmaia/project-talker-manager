function randomToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ 
    length: 16,
  }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

module.exports = randomToken;
