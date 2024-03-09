const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isLogin} = require('../middlewares/authMiddleware');

router.route('/')
    .get(isLogin, userController.getUserInfo)

router.route('/register')
    .post(userController.registerUser)

router.route('/login')
    .post(userController.login)

router.route('/logout')
    .post(isLogin, userController.logout)

module.exports = router;