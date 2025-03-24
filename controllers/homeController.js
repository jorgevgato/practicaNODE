import Product from "../models/Product.js"

export async function index (req, res, next) {
    try {
        res.locals.products = await Product.find()
        res.render('home')

    } catch (error) {
        next(error)
    }
}



/** VALIDACIONES paraminquery CLASE 4 INICIO
 * (validator instalado)
 */