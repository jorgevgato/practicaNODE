import Product from "../models/Product.js"

export function index(req, res, next) {
    res.render('new-product')
}

export async function postNew(req, res, next) {
    try {
        const {name, price, image, tags} = req.body

        const product = new Product({name, price, image, tags}) 

        await product.save()

        res.redirect('/')

    } catch (error) {
        next(error)
    }
}