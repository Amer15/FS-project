const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


//This Schema is based on PRODUCT SCHEMA
const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model('ProductCart', productCartSchema);



//OrderSchema can also be called as CartShema
const orderSchema = new mongoose.Schema({
    products: [productCartSchema],  //products in Cart page => productCartSchema
    transaction_id: String,
    status: {
      type: String,
      default: 'Recieved',
      enum: ['Recieved', 'Processing', 'Shipped', 'Cancelled', 'Returned']
    },
    amount: { 
      type: Number
    },
    address: {
        type: String
    },
    updated: Date,
    //Who is ordering => User
    user: {
        type: ObjectId,
        ref: 'User'
    }
},
{timestamps: true},
);

const Order = mongoose.model('Order', orderSchema);



module.exports = {
    Order,
    ProductCart
}