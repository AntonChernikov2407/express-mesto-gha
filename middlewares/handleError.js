const userNotFound = { message: 'Запрашиваемый пользователь не найден' };
const cardNotFound = { message: 'Карточка с указанным id не найдена.' };

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  if (err.name === 'Error') {
    return res.status(404).send(req.path.includes('cards') ? cardNotFound : userNotFound);
  }
  // eslint-disable-next-line no-constant-condition
  if (err.name === 'CastError' || 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(500).send({ message: 'Что-то пошло не так' });
};

module.exports = handleError;
