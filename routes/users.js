const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/user')


router.get('/register', (req, res) => {
    res.render('users/register')
})
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => { if (err) return next(err) })
        req.flash('success', 'Welcome to Yelpcamp')
        res.redirect('/campgrounds')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }

}))
router.get('/login', (req, res) => {
    res.render('users/login')
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'Logged you out.')
    res.redirect('/campgrounds')
})

module.exports = router;