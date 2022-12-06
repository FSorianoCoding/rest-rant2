const router = require('express').Router()
// const places = require('../models/places')
const db = require('../models')

// INDEX
router.get('/', (req, res) => {
    // res.render('places/index', { places })
    db.Place.find()
        .then(places => {
            res.render('places/index', { places })
        })
        .catch(err => {
            console.log(err)
            res.render('error404')
        })
})

// CREATE
router.post('/', (req, res) => {
    // // console.log(req.body)
    // if (!req.body.pic) {
    //     // Default image if one is not provided
    //     req.body.pic = 'http://placekitten.com/400/400'
    // }
    // if (!req.body.city) {
    //     req.body.city = 'Anytown'
    // }
    // if (!req.body.state) {
    //     req.body.state = 'USA'
    // }
    // places.push(req.body)
    // // res.send ('POST /places')
    // res.redirect('/places')

    // Sending in the req.body object works in lieu of spelling everything out
    // ONLY if the fields in your form are named exactly like your database fields.
    if (req.body.pic === '') { req.body.pic = undefined }
    if (req.body.city === '') { req.body.city = undefined }
    if (req.body.state === '') { req.body.state = undefined }
    db.Place.create(req.body)
        .then(() => {
            res.redirect('/places')
        })
        .catch(err => {            
            if (err && err.name == 'ValidationError') {
                let message = 'Validation Error: '
                for (var field in err.errors) {
                    message += `${field} was ${err.errors[field].value}.`
                    message += `${err.errors[field].message}`
                }
                console.log('Validation error message', message)
                res.render('places/new', { message })
            } else {
                res.render('error404')
            }
        })
})

// NEW
router.get('/new', (req, res) => {
    res.render('places/new')
})

// SHOW
router.get('/:id', (req, res) => {
    // let id = Number(req.params.id)
    // if (isNaN(id)) {
    //     res.render('error404')
    // } else if (!places[id]) {
    //     res.render('error404')
    // } else {
    //     res.render('places/show', { place: places[id], id })
    // }
    db.Place.findById(req.params.id)
        .populate('comments')        
        .then(place => {            
            console.log("test send before", place.comments)
            res.render('places/show', { place })
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

// PUT Route for edits
router.put('/:id', (req, res) => {    
    // let id = Number(req.params.id)    
    // if (isNaN(id)) {
    //     res.render('error404')
    // } else if (!places[id]) {
    //     res.render('error404')
    // } else {
    //     // Dig into req.body and make sure data is valid
    //     if (!req.body.pic) {
    //         // Default image if one is not provided
    //         req.body.pic = 'http://placekitten.com/400/400'
    //     }
    //     if (!req.body.city) {
    //         req.body.city = 'Anytown'
    //     }
    //     if (!req.body.state) {
    //         req.body.state = 'USA'
    //     }
  
    //     // Save the new data into places[id]
    //     places[id] = req.body
    //     res.redirect(`/places/${id}`)
    // }
    // res.send('PUT /places/:id stub')
    db.Place.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/places/${req.params.id}`)
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})
  
// DELETE
router.delete('/:id', (req, res) => {
    // let id = Number(req.params.id)
    // if (isNaN(id)) {
    //     res.render('error404')
    // } else if (!places[id]) {
    //     res.render('error404')
    // } else {
    //     places.splice(id, 1)
    //     // res.send('STUB DELETE places/:id')
    //     res.redirect('/places')
    // }
    // res.send('DELETE /places/:id stub')
    db.Place.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/places')
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

// EDIT
router.get('/:id/edit', (req, res) => {
    // res.send('GET places/:id/edit form stub')
    // let id = Number(req.params.id)
    // if (isNaN(id)) {
    //     res.render('error404')
    // } else if (!places[id]) {
    //     res.render('error404')
    // } else {
    //     res.render('places/edit', { place: places[id] })
    // }
    db.Place.findById(req.params.id)
        .then(place => {
            res.render('places/edit', { place })
        })
        .catch(err => {
            res.render('error404')
        })
})

// CREATE COMMENT
router.post('/:id/comment', (req, res) => {
        // res.send('GET /places/:id/comment stub')
    console.log('post comment', req.body)
    if (req.body.author == '') {req.body.author = undefined }
    req.body.rant = req.body.rant ? true : false
    db.Place.findById(req.params.id)
        .then(place => {
            db.Comment.create(req.body)
                .then(comment => {
                    place.comments.push(comment.id)
                    // The save() method takes any changes we've made to the object since we 
                    // fetched it with findById and writes them back to the Mongo database.
                    place.save()
                    .then(() => {
                        res.redirect(`/places/${req.params.id}`)
                    })
                    .catch(err => {
                        res.render('error404')
                    })
                })
                .catch(err => {
                    res.render('error404')
                })
        })
        .catch(err => {
            res.render('error404')
        })
})

// DELETE RANT
router.delete('/:id/rant/:rantId', (req, res) => {
    // res.send('GET /places/:id/rant/:rantId stub')
    db.Comment.findByIdAndDelete(req.params.rantId)
        .then(() => {
            console.log('Success')
            res.redirect(`/places/${req.params.id}`)
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

module.exports = router