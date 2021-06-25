require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const AutorizationError = require('../utils/errors/AutorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers.cookie);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AutorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AutorizationError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
