const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(new Error())
  .then((user) => res.send({ data: user }))
  // if (!user) {
  //   return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
  // }
  .catch((err) => {
    next(err);
    // console.log(err.name);
    // if (err.name === 'CastError') {
    //   return res.status(400).send({ message: 'Переданы некорректные данные' });
    // }
    // return res.status(500).send({ message: err.message });
  });

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      next(err);
      // if (err.name === 'ValidationError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

const updateProfileById = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error())
    .then((user) => res.send({ data: user }))
    // if (!user) {
    //   return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    // }
    .catch((err) => {
      next(err);
      // if (err.name === 'ValidationError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

const updateAvatarById = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error())
    .then((user) => res.send({ data: user }))
    // if (!user) {
    //   return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    // }
    .catch((err) => {
      next(err);
      // if (err.name === 'ValidationError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileById,
  updateAvatarById,
};
