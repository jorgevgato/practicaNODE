import mongoose from "mongoose";
import { index } from "../controllers/homeController.js";

const productSchema = new mongoose.Schema({
    name: String,
    owner: { ref: 'User', type: mongoose.Schema.Types.ObjectId, index: true },
    price: Number,
    image: String,
    tags: [String]
}, {
    collection: 'products'
})

const Product = mongoose.model('Product', productSchema)

export default Product