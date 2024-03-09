const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    createTime: {
        type: Date,
        required: true
    },
    modifyTime: {
        type: Date,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product