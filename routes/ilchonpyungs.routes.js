const express = require('express');
const router = express.Router();
const IlchonpyungsController = require('../controllers/ilchonpyungs.controllers');
const ilchonpyungsController = new IlchonpyungsController();
const auth = require('../middlewares/authMiddlewares');

router
  .route('/:ilchonpyungId/:userId')
  .delete(auth, ilchonpyungsController.deleteBest);

router
  .route('/:userId')
  .post(auth, ilchonpyungsController.createBest)
  .get(ilchonpyungsController.getBests);

module.exports = router;
