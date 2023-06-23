const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(require('./middlewares/handleCelebrateError'));
app.use(require('./middlewares/handleError'));

app.use('*', (req, res) => { res.status(404).send({ message: 'Страница не найдена' }); });

app.listen(PORT);
