import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import { fileURLToPath } from 'url';
import * as homeController from './controllers/homeController.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', 'views')
app.set('view engine', 'ejs')
app.locals.appName = 'nodePOP'

app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


/* APP ROUTES */
app.get('/', homeController.index)

app.use((req, res, next) => {
    next(createError(404))
})


/* ERROR HANDLER */
app.use((err, req, res, next) => {
    if (err.array) {
      err.message = 'Invalid request: ' + err.array()
        .map(e => `${e.location} ${e.type} "${e.path}" ${e.msg}`)
        .join(', ')
      err.status = 422
    }
  
    res.status(err.status || 500)

    res.locals.message = err.message
    res.locals.error = process.env.NODEPOP_ENV === 'development' ? err : {}

    res.render('error')
})

export default app