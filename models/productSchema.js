const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        // Enumerator: ['Nike', 'Adidas', 'Puma'] => only these companies can add data
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],  // Array of strings
        default: []
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150"
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('EProduct', productSchema);
