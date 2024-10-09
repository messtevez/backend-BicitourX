import { Schema, model } from 'mongoose';
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    eventImgs: [{
        type: String,
        required: true,
    }],
    descripcion:[{
        type: String,
        required: true,
    }]
});
const Event = model('Events', eventSchema);
export default Event;
