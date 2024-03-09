const Product = require('../models/products');

const addProduct = async (req, res) => {
    const {name, description, sku, price} = req.body;
    try {
        const product = new Product({
            name: name,
            description: description,
            sku: sku,
            price: price,
            createTime: Date(),
            modifyTime: Date()
        });
        const data = await product.save();
        return res.json({ret:true, msg:'Add product success', data:data});
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

const retrieveProduct = async (req, res) => {
    const productID = req.params.productID;
    try{
        if (productID){
            // Retrieve one
            const product = await Product.findById(productID);
            return res.json({ret:true, msg:'Retrieve product success', data:product});
        }
        else{
            // Retrieve all
            const product = await Product.find();
            return res.json({ret:true, msg:'Retrieve product success', data:product});
        }
    }
    catch (err){
        return res.status(500).json({ret:false, msg:err.message, data:err});
    }
}

const editProduct = async (req, res) => {
    const {name, description, sku, price} = req.body;
    if (!name || !description || !sku || !price){
        return res.json({ret:false, msg:'Input not complete', data:null});
    }

    const productID = req.params.productID;
    if (productID){
        try{
            const updateData = {
                name: name,
                description: description,
                sku: sku,
                price: price,
                modifyTime: Date()
            }
            const updatedProduct = await Product.findByIdAndUpdate(productID, updateData);
            if (updatedProduct){
                return res.json({ret:true, msg:'Edit product success', data:updatedProduct});
            }
            else{
                return res.json({ret:false, msg:'There is no product to update', data:updatedProduct});
            }
        }
        catch (err){
            return res.status(500).json({ret:false, msg:err.message, data:err});
        }
    }
    else{
        return res.status(404).json({ret:false, msg:'Not support route', data:null});
    }
}


const deleteProduct = async (req, res) => {
    const productID = req.params.productID;
    if (productID){
        // Retrieve one
        try{
            const product = await Product.findByIdAndDelete(productID)
            if (product){
                return res.json({ret:true, msg:'Delete product success', data:product});
            }
            else{
                return res.json({ret:false, msg:'There is no product to delete', data:null});
            }
        }
        catch (err){
            return res.status(500).json({ret:false, msg:err.message, data:err});
        }
    }
    else{
        return res.status(404).json({ret:false, msg:'Not support route', data:null});
    }
}

module.exports = {addProduct, retrieveProduct, editProduct, deleteProduct};