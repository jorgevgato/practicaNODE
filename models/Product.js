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

productSchema.statics.list = function(filter, limit, skip, sort, fields) {
    const query = Product.find(filter)
    query.limit(limit)
    query.skip(skip)
    query.sort(sort)
    query.select(fields)
    return query.exec()
}

const Product = mongoose.model('Product', productSchema)

export default Product