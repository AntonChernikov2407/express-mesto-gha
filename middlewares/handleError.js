const { isCelebrateError } = require('celebrate');
// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  const { statusCode = 500, message, code } = err;
  // if (code === 11000) {
  //   return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
  // }
  return res.status(statusCode).send({ message: statusCode === 500 ? 'Что-то пошло не так' : message });
};

module.exports = handleError;
