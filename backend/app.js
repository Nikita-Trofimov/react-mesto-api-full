const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const NotFound = require('./utils/errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/serverError');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
}), createUser);

app.use(auth);

app.use(cardRoutes);
app.use(userRoutes);

app.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);