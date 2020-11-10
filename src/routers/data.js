const express = require('express')
const Data = require('../models/data')
const router = new express.Router()
const path = require('path')

router.get('/data/airTemp/:airTemp/soilTemp/:soilTemp/humidity/:humidity/soilMoisture/:soilMoisture/watered/:watered', async (req, res) => {
    console.log(req.params)
    const data = new Data(req.params) 
    try {
        await data.save()
        res.status(201).send("OK")
    } catch (e) {
        res.status(400).send(e)
    }
    
})

module.exports = router