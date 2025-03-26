import User from "../models/User.js"

export function index(req, res, next) {
    res.locals.error = ''
    res.locals.email = ''
    res.render('login')
}

export async function postLogin(req, res, next) {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email: email})

        if (!user || !(await user.comparePassword(password))) {
            res.locals.error = 'Datos de login incorrectos'
            res.locals.email = email
            res.render('login')
            return
        }

        res.redirect('/')

    } catch (error) {
        next(error)
    }
    
}