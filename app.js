const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.use(routes);

app.use(errors());
// app.use(require('./middlewares/handleCelebrateError'));
app.use(require('./middlewares/handleError'));

app.listen(PORT);
