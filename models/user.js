const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: { type: String },
  about: { type: String },
  avatar: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильная почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { throw new UnauthorizedError('Неправильная почта или пароль'); }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
