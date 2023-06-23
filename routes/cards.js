const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const pattern = require('../utils/pattern');
const {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCardById);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(2).max(30).required()
      .regex(pattern),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), putLikeById);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteLikeById);

module.exports = router;
