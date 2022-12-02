const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// What we're doing with the index.js file in the models folder is making
// a one-stop shop for our connection information and access to all of our models. 
// Right now, we just have one model, but soon, we'll have two, 
// and it will be nice to access them at a single location.
module.exports.Place = require('./places')