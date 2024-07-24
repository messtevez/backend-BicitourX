const {Schema, model} = require('mongoose')

const eventSchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true, 
    },
    hour: {
        type: String,
        required: true 
    },
    location: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }

})

module.exports = model('Events', eventSchema)
