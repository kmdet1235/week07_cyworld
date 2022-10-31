const express = require('express');
const router = express.Router();
const GuestBooksController = require('../controllers/guestBooks.controllers');
const guestBooksController = new GuestBooksController();
const auth = require('../middlewares/authMiddlewares');

router
  .route('/:guestbookId/:userId')
  .put(auth, guestBooksController.updateBook)
  .delete(auth, guestBooksController.deleteBook);

router
  .route('/:userId')
  .post(auth, guestBooksController.createBook)
  .get(guestBooksController.getBooks);

module.exports = router;
