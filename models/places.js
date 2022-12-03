const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pic: { type: String, default: 'public/images/default.jpg'},
    cuisines: { type: String, required: true },
    city: { type: String, default: 'Anytown' },
    state: { type: String, default: 'USA' },
    founded: {
        type: Number,
        min: [1673, 'Surely not that old?!'],
        max: [new Date().getFullYear(), 'Hey, this year is in the future!']
    }
})

placeSchema.methods.showEstablished = function () {
    return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`
  }
  
module.exports = mongoose.model('Place', placeSchema)

// module.exports = [{
//     id: 0,
//     name: 'H-Thai-ML',
//     city: 'Seattle',
//     state: 'WA',
//     cuisines: 'Thai, Pan-Asian',
//     pic: '/images/thai-rest.jpg'
// }, {
//     id: 1,
//     name: 'Coding Cat Cafe',
//     city: 'Phoenix',
//     state: 'AZ',
//     cuisines: 'Coffee, Bakery',
//     pic: '/images/code-cafe.jpg'
// }]
