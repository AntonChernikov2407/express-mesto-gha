const userNotFound = { message: 'Запрашиваемый пользователь не найден' };
const cardNotFound = { message: 'Карточка с указанным id не найдена.' };

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  if (err.name === 'Error') {
    return res.status(404).send(req.path.includes('cards') ? cardNotFound : userNotFound);
  }
  if (err.name === 'ValidationError') {
    // console.log(`${Object.values(err.errors).map((err) => err.message).join(', ')}`);
    return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(500).send({ message: 'Что-то пошло не так' });
};

module.exports = handleError;
