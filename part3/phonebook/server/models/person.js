const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;

mongoose
    .connect(dbUrl)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('error connecting to MongoDB', err.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
