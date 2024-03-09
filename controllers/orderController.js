const {Order, OrderDetail} = require('../models/orders');
const Cart = require('../models/carts');

const createOrder = async (req, res) => {
    const order = new Order({
        userID: req.user._id,
        orderTime: Date()
    });
    try{
        const carts = await Cart.find({userID: req.user._id}).populate({path:'productID'});
        if (carts.length !== 0){
            const createdOrder = await order.save();
            carts.forEach(async el => {
                orderDetail = new OrderDetail({
                    orderID: createdOrder._id,
                    productID: el.productID._id,
                    orderedPrice: el.productID.price,
                    productQty: el.productQty
                });
                await orderDetail.save();
            });
            const orderDetails = await OrderDetail.find({orderID: createdOrder._id}).populate({path:'productID'});

            // Clear cart
            await Cart.deleteMany({userID: req.user._id});

            return res.json({ret:true, msg:'Create order success', data:orderDetails});
        }
        else{
            return res.json({ret:false, msg:'There is no item in cart', data:null});
        }
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

const retrieveOrderByUser = async (req, res) => {
    try{
        const orders = await Order.aggregate([
            {
                $match: {
                    userID: req.user._id
                }
            },
            {
                $lookup: {
                    from: 'orderDetail',
                    localField: '_id',
                    foreignField: 'orderID',
                    as: 'orderDetails'
                }
            },
            {
                $unwind: '$orderDetails'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderDetails.productID',
                    foreignField: '_id',
                    as: 'orderDetails.productInfo'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    userID: { $first: '$userID' },
                    orderTime: { $first: '$orderTime' },
                    orderDetails: { $push: '$orderDetails' }
                }
            }
        ]);
        return res.json({ret:false, msg:'Retrieve order by user success', data:orders});
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

module.exports = {createOrder, retrieveOrderByUser};