const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const auth = require('../middlewares/authMiddlewares');
const UsersController = require('../controllers/users.controllers');
const usersController = new UsersController();

router.post('/signup',authlogin,usersController.signup);
router.post('/login',authlogin,usersController.login)
router.get('/emailcheck',usersController.emailCheck)
router.get('/surfing', usersController.surfing);
router.get('/myhome/:userId', usersController.myhome);
router.put('/myhome/:userId',auth,usersController.intro);
module.exports = router;
