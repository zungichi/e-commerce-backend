const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/products');

const orderSchema = Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    orderTime: {
        type: Date,
        required: true
    },
});

const orderDetailSchema = Schema({
    orderID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    productID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    orderedPrice: {
        type: Number,
        required: true,
        min: 0
    },
    productQty: {
        type: Number,
        required: true,
        min: 0
    }
})

const Order = mongoose.model('Order', orderSchema);
const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema, 'orderDetail');

module.exports = {Order, OrderDetail};