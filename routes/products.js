const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {isLogin} = require('../middlewares/authMiddleware');

router.route('/')
    .post(isLogin,productController.addProduct)

router.route('/:productID?')
    .get(isLogin, productController.retrieveProduct)
    .delete(isLogin, productController.deleteProduct)
    .put(isLogin, productController.editProduct)


module.exports = router;