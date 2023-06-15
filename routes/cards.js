const router = require('express').Router();
const {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCardById);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', putLikeById);
router.delete('/cards/:cardId/likes', deleteLikeById);

module.exports = router;
