import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import { fileURLToPath } from 'url';
import connectMongoose from './lib/connectMongoose.js';
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productsController from './controllers/productsController.js'
import * as apiLoginController from './controllers/api/apiLoginController.js'
import * as apiProductsController from './controllers/api/apiProductsController.js'
import * as sessionManager from './lib/sessionManager.js'
import * as localeController from './controllers/localeController.js'
import * as jwtAuth from './lib/jwtAuthMiddleware.js'
import upload from './lib/uploadConfigure.js';
import i18n from './lib/i18nConfigure.js';
import cookieParser from 'cookie-parser';
import { error } from 'node:console';

await connectMongoose()
console.log('Connected to MongoDB')

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', 'views')
app.set('view engine', 'ejs')
app.locals.appName = 'nodePOP'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

/* API ROUTES */
app.post('/api/login', apiLoginController.loginJWT)
app.get('/api/products', jwtAuth.guard, apiProductsController.list)
app.get('/api/products/:productId', jwtAuth.guard, apiProductsController.getOne)
app.post('/api/products', jwtAuth.guard, upload.single('image'), apiProductsController.newProduct)
app.put('/api/products/:productId', jwtAuth.guard, upload.single('image'), apiProductsController.update)
app.delete('/api/products/:productId', jwtAuth.guard, apiProductsController.deleteProduct)

/* WEBAPP ROUTES */
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.use(cookieParser())
app.use(i18n.init)
app.get('/change-locale/:locale', localeController.changeLocale)
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)
app.get('/products/new', sessionManager.guard, productsController.index)
app.post('/products/new', sessionManager.guard, upload.single('image'),productsController.postNew)
app.get('/products/delete/:productId', sessionManager.guard, productsController.deleteProduct)

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

    // API errors - response JSON
    if (req.url.startsWith('/api/')) {
      res.json({error: err.message})
      return
    }

    res.locals.message = err.message
    res.locals.error = process.env.NODEPOP_ENV === 'development' ? err : {}

    res.render('error')
})

export default app