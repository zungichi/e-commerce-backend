const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/products');

const cartSchema = Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    productQty: {
        type: Number,
        required: true,
        min: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;