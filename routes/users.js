const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfileById,
  updateAvatarById,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfileById);
router.patch('/me/avatar', updateAvatarById);

module.exports = router;
