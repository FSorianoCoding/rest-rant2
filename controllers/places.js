const router = require('express').Router()

router.get('/', (req, res) => {
    // res.send('GET /places')
    let places = [{
        name: 'H-Thai-ML',
        city: 'Seattle',
        state: 'WA',
        cuisines: 'Thai, Pan-Asian',
        pic: '/images/thai-rest.jpg'
      }, {
        name: 'Coding Cat Cafe',
        city: 'Phoenix',
        state: 'AZ',
        cuisines: 'Coffee, Bakery',
        pic: '/images/code-cafe.jpg'
      }]      
    res.render('places/index', { places })
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('POST /places')
})

router.get('/new', (req, res) => {
  res.render('places/new')
})

module.exports = router