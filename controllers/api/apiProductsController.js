import Product from "../../models/Product.js"

export async function list(req, res, next) {

  try {

    const filterName = req.query.name
    const filterTags = req.query.tags
    const limit = req.query.limit
    const skip = req.query.skip
    const sort = req.query.sort
    const fields = req.query.fields
    const withCount = req.query.count === 'true'

    const filter = {
            //TODO
        }

    if (filterName) {
      filter.name = filterName
    }
    if (filterTags) {
      filter.tags = filterTags
    }

    const products = await Product.list(filter, limit, skip, sort, fields)
    const result = {results: products}
    
    if (withCount) {
      const count = await Product.countDocuments(filter)
      result.count = count
    }

    res.json(result)
    
  } catch (error) {
    next(error)
  }
}

export async function getOne(req,res,next) {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)

    res.json({ result: product })

  } catch (error) {
    next(error)
  }
}