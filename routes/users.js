const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const pattern = /(?:(?:https?):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i;
const {
  getUsers,
  getUserById,
  getThisUserById,
  updateProfileById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/me', getThisUserById);
router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileById);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern),
  }),
}), updateAvatarById);

module.exports = router;
