import Product from "../models/Product.js"

export async function index (req, res, next) {
    try {
        const userId = req.session.userId
        const page = parseInt(req.query.page) || 1
        const limit = 2

        let products = []
        let totalPages = 1

        if (userId) {
        const totalProducts = await Product.countDocuments({owner: userId})
        console.log('Total productos: ', totalProducts)
        
        totalPages = Math.ceil(totalProducts / limit) || 1
        console.log('Total páginas: ', totalPages)

        products = await Product.find({owner: userId})
            .limit(limit)
            .skip((page - 1) * limit)
        }
        
        res.render('home', {
            products,
            currentPage: page,
            totalPages
        })

    } catch (error) {
        next(error)
    }
}

/** VALIDACIONES paraminquery CLASE 4 INICIO
 * (validator instalado)
 */