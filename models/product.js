const mongoose = require('mongoose');
const productSchema = mongoose.Schema;

let Product = new productSchema({
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: Array, required: true },
    materials: { type: String, required: true },
    country: { type: String, required: true },
    availability: { type: Boolean, required: true },
    season: { type: Array, required: true }
});

module.exports = mongoose.model('Product', Product);