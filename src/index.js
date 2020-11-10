const express = require('express')
const path = require('path')
// const hbs = require('hbs')
require('./db/mongoose')
// const cookieParser = require('cookie-parser')


const dataRouter = require('./models/data')
// const shiftRouter = require('./routers/shift')
// const requestRouter = require('./routers/request')
// const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

// //Define paths for exprewss config
// const publicDirectoryPath = path.join(__dirname, '../public/')
// const viewsPath = path.join(__dirname, '../src/templates/views')
// const partialsPath = path.join(__dirname, '../src/templates/partials')

// Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)
// hbs.registerHelper('formatTime', function(dateString) {
//     // const localDate = new Date(dateString).toLocaleDateString()
//     const localTime = new Date(dateString).toLocaleTimeString('en-AU', {hour: '2-digit', minute:'2-digit',hour12: false})
//     return new hbs.SafeString(localTime)
// })
// hbs.registerHelper('formatDay', function(dateString) {
//     const localDay = new Date(dateString).toLocaleDateString('en-AU', { weekday: 'short' })
//     return new hbs.SafeString(localDay)
// })
// hbs.registerHelper('formatDate', function(dateString) {
//     const localDate = new Date(dateString).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
//     return new hbs.SafeString(localDate)
// })
// hbs.registerHelper('formatStartShift', function(dateString) {
//     const shiftStart = new Date(dateString).toLocaleDateString('en-AU', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
//     return new hbs.SafeString(shiftStart)
// })



//setup static directory to serve
// app.use(express.static(publicDirectoryPath))
// console.log(publicDirectoryPath)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(dataRouter)
// app.use(shiftRouter)
// app.use(requestRouter)


app.get('/', (req, res) => {
    try {
        res.send('index')
    }
    catch {
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port)
})



