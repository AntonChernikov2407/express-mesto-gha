const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfileById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateProfileById);
router.patch('/users/me/avatar', updateAvatarById);

module.exports = router;
