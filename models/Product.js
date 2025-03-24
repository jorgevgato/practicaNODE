import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    owner: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
    price: Number,
    image: String,
    tags: [String]
}, {
    collection: 'products'
})

const Product = mongoose.model('Product', productSchema)

export default Product