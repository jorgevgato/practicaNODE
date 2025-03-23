import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import * as homeController from './controllers/homeController.js'

const app = express()

app.use(logger('dev'))

app.get('/', homeController.index)

app.use((req, res, next) => {
    next(createError(404))
})

/** 
app.use((err, req, res, next) => {
    if (err.array) {
      err.message = 'Invalid request: ' + err.array()
        .map(e => `${e.location} ${e.type} "${e.path}" ${e.msg}`)
        .join(', ')
      err.status = 422
    }
  
    res.status(err.status || 500)

    res.locals.message = err.message
    res.locals.error = process.env.NODEAPP_ENV === 'development' ? err : {}

    res.render('error')
})
*/

export default app