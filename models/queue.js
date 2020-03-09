const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
    queueNumber : {
        type: Number, 
        min: [1, 'Invalid Queue Number'],
        require: true
    },
    studentId :{
        type : String, 
        required : [true, `Student Number is required`]
    },
    category :{
        type: String, 
        required : [true, `What type of transaction is this?`]
    },
    status :{
        type: String, 
        required: [true, `What's the status of this transaction?`],
        default: `Pending`
    },
    date_created :{
        type: Date, 
        required: true, 
        default: Date.now
    }
})

module.exports = mongoose.model('Queue', QueueSchema, 'queues' )