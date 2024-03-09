const Cart = require('../models/carts');
const Product = require('../models/products');

const productValidation = async (productID) => {
    // Validate that product ID is exist
    try{
        const product = await Product.findById(productID);
        if (product){
            return true;
        }
        else{
            return false;
        }
    }
    catch (err){
        return false;
    }
}

const addCart = async (req, res) => {
    const {productID, productQty} = req.body;
    const cart = new Cart({
        userID: req.user._id,
        productID: productID,
        productQty: productQty
    });
    const isProductValid = await productValidation(productID);
    if (isProductValid){
        try{
            // Check product has already exist i cart
            const cartProduct = await Cart.findOne({productID: productID});
            if (!cartProduct){
                const data = await cart.save();
                return res.json({ret:true, msg:'Add cart success', data:data});
            }
            else{
                return res.json({ret:true, msg:'Cannot add product to cart. Already has product in cart', data:null});
            }
        }
        catch (err){
            return res.status(500).json({ret:false, msg:err.message, data:err});
        }
    }
    else{
        return res.json({ret:false, msg:'There is no product ID', data:null});
    }
}

const retrieveCart = async (req, res) => {
    try{
        const cart = await Cart.find({userID:req.user._id}).populate({path:'productID'});
        return res.json({ret:true, msg:'Retrieve cart success', data:cart});
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

const editCart = async (req, res) => {
    // Can edit only product quantity
    const {productQty} = req.body;
    if (!productQty){
        return res.json({res:false, msg:'Product quantity not found', data:null});
    }
    const cartID = req.params.cartID;
    try{
        const updatedCart = await Cart.findByIdAndUpdate(cartID, {productQty: productQty});
        // const updatedCart = await Product.findById(cartID);
        console.log(updatedCart);
        if (updatedCart){
            return res.json({res:true, msg:'Edit cart success', data:updatedCart});
        }
        else{
            return res.json({res:false, msg:'There is no cart to update', data:null});
        }
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

const deleteCart = async (req, res) => {
    const cartID = req.params.cartID;
    try{
        const cart = await Cart.findByIdAndDelete(cartID)
        if (cart){
            return res.json({ret:true, msg:'Delete cart success', data:cart});
        }
        else{
            return res.json({ret:false, msg:'There is no cart to delete', data:cart});
        }
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

module.exports = {addCart, retrieveCart, editCart, deleteCart};