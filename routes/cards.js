const router = require('express').Router();
const {
  getCards,
  deleteCardById,
  createCard,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.post('/', createCard);
router.put('/:cardId/likes', putLikeById);
router.delete('/:cardId/likes', deleteLikeById);

module.exports = router;
