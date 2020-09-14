const { Schema, model }  = require('mongoose');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2200
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 10
    },
    category: {
       type: ObjectId,
       ref: 'Category',
       required: true
    },
    total_units: {
        type: Number,
        required: true
    },
    sold_units: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},
{ timestamps: true } //adds both createdAt and updatedAt
);


module.exports = model('Product', productSchema);