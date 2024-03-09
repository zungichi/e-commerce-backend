const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {isLogin} = require('../middlewares/authMiddleware');

router.route('/')
    .get(isLogin, cartController.retrieveCart)
    .post(isLogin, cartController.addCart)

router.route('/:cartID')
    .put(isLogin, cartController.editCart)
    .delete(isLogin, cartController.deleteCart)

module.exports = router;