const jwt = require('jsonwebtoken');

const ACCESS_SECRET = 'ACCESS_SECRET_KEY';
const REFRESH_SECRET = 'REFRESH_SECRET_KEY';

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  ACCESS_SECRET,
  REFRESH_SECRET
};
