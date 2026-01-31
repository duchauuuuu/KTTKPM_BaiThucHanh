const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {
  generateAccessToken,
  generateRefreshToken,
  REFRESH_SECRET
} = require('./auth');

const {
  authenticateToken,
  authorizeRole
} = require('./middleware');

const app = express();
app.use(bodyParser.json());

// giả lập user
const users = [
  { username: 'admin', password: '123', role: 'ADMIN' },
  { username: 'guest', password: '123', role: 'GUEST' }
];

let refreshTokens = [];
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.sendStatus(401);

  const payload = {
    username: user.username,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    role: user.role
  });
});

// REFRESH TOKEN
app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.sendStatus(403);

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({
      username: user.username,
      role: user.role
    });

    res.json({ accessToken });
  });
});

// API chỉ ADMIN
app.get('/admin', authenticateToken, authorizeRole('ADMIN'), (req, res) => {
  res.json({ message: 'Hello ADMIN' });
});

// API cho mọi user đăng nhập
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000, () => {
  console.log('JWT server running at http://localhost:3000');
});
