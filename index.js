// Require the environment variables
require('dotenv').config()

// Require needed node modules
const express = require('express')
const app = express()

// Defining the view engine
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// Import router for places
app.use('/places', require('./controllers/places'))

// Declare the routes
app.get('/', (req, res) => {
    // res.send('Hello World!')
    // You don't have to specify the 'views' folder. 
    // It already knows to look for a 'views' folder when you call the render method!
    res.render('home')
})

app.get('*', (req, res) => {
    // res.status(404).send('<h1>404 Page</h1>')
    res.render('error404')
})

// Listen to a port number defined by a local environment variable
app.listen(process.env.PORT)