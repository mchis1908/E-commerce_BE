const mongoose = require('mongoose');


// Tạo lược đồ CSDL product
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    offer: {
        type: Number
    },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    updateAt: Date,
}, { timestamps: true });


module.exports = mongoose.model('product', productSchema);