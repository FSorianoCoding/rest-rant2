const router = require('express').Router()
const places = require('../models/places')

// INDEX
router.get('/', (req, res) => {
    res.render('places/index', { places })
})

// CREATE
router.post('/', (req, res) => {
    // console.log(req.body)
    if (!req.body.pic) {
        // Default image if one is not provided
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
        req.body.city = 'Anytown'
    }
    if (!req.body.state) {
        req.body.state = 'USA'
    }
    places.push(req.body)
    // res.send ('POST /places')
    res.redirect('/places')
})

// NEW
router.get('/new', (req, res) => {
    res.render('places/new')
})

// SHOW
router.get('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    } else if (!places[id]) {
        res.render('error404')
    } else {
        res.render('places/show', { place: places[id], id })
    }
})

// DELETE
router.delete('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    } else if (!places[id]) {
        res.render('error404')
    } else {
        places.splice(id, 1)
        // res.send('STUB DELETE places/:id')
        res.redirect('/places')
    }
})

// EDIT
router.get('/:id/edit', (req, res) => {
    // res.send('STUB GET places/:id/edit')
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    } else if (!places[id]) {
        res.render('error404')
    } else {
        res.render('places/edit', { place: places[id] })
    }
})

module.exports = router