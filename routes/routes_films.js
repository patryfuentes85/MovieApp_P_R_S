const express = require('express;');
const router = express.Router();


router.get('/', (req, res) => {
    
    res.render('home.pug')
})
router.get('/dashboard', (req, res) => {
    
    res.render('home.pug')
})
router.get('/search/:title', (req, res) => {
    
    res.render('home.pug')
})
router.get('/search', (req, res) => {
    
    res.render('home.pug')
})
router.get('/movies', (req, res) => {
    
    res.render('home.pug')
})
router.post('/signup', (req, res) => {
    
    res.render('home.pug')
})
router.post('/login', (req, res) => {
    
    res.render('home.pug')
})
router.post('/logout', (req, res) => {
    
    res.render('home.pug')
})
router.post('/createMovie', (req, res) => {
    
    res.render('home.pug')
})
router.put('/editMovie/:id?', (req, res) => {
    
    res.render('home.pug')
})
router.delete('/removeMovie', (req, res) => {
    
    res.render('home.pug')
})

router.get('/recoverpassword', (req, res) => {
    
    res.render('home.pug')
})
router.get('/restorepassword', (req, res) => {
    
    res.render('home.pug')
})