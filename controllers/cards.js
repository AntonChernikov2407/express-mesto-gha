const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error())
    .then(() => res.send({ message: 'Карточка удалена' }))
    // if (!card) {
    //   return res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    // }
    .catch((err) => {
      next(err);
      // if (err.name === 'CastError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      next(err);
      // if (err.name === 'ValidationError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

const putLikeById = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error())
    .then((card) => res.send({ data: card }))
    // if (!card) {
    //   return res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    // }
    .catch((err) => {
      next(err);
      // if (err.name === 'CastError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

const deleteLikeById = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error())
    .then((card) => res.send({ data: card }))
    // if (!card) {
    //   return res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
    // }
    .catch((err) => {
      next(err);
      // if (err.name === 'CastError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
};
