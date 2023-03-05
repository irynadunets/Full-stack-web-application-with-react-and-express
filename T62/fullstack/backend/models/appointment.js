const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

appointmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)