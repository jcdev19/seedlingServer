const { Int32 } = require('mongodb')
const mongoose = require('mongoose')



const dataSchema = new mongoose.Schema({
    airTemp: {
        type: Number,
        trim: true
    },
    soilTemp: {
        type: Number,
        trim: true
    },
    humidity: {
        type: Number,
        trim: true
    },
    soilMoisture: {
        type: Number,
        trim: true
    },
    watered: {
        type: Boolean
    }  
}, {
    timestamps: true
})

const Data = mongoose.model('Data', dataSchema)



module.exports = Data