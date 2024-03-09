const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {isLogin} = require('../middlewares/authMiddleware');

router.route('/')
    .get(isLogin, orderController.retrieveOrderByUser)
    .post(isLogin, orderController.createOrder);

module.exports = router;