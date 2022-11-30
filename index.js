// Require the environment variables
require('dotenv').config

// Require needed node modules
const express = require('express')
const app = express()

// Import router for places
app.use('/places', require('./controllers/places'))

// Declare the routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
})

// Listen to a port number defined by a local environment variable
app.listen(process.env.PORT)