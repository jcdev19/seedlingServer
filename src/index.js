const express = require('express')
const path = require('path')
// const hbs = require('hbs')
require('./db/mongoose')
// const cookieParser = require('cookie-parser')


const dataRouter = require('./routers/data')
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
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(dataRouter)
// app.use(shiftRouter)
// app.use(requestRouter)


app.get('/', (req, res) => {
    try {
        res.send(`<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script><h1>indexsdd</h1>
        <canvas id="tempChart" width="300" height="100"></canvas>
        <canvas id="moistChart" width="300" height="100"></canvas>
        <script>
        const scale = (num, in_min, in_max, out_min, out_max) => {
            return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
          }
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            let dataLabels = data.labels.map(({ createdAt }) => createdAt)
            let airTemp = data.data.map(({ airTemp }) => airTemp)
            let humidity = data.data.map(({ humidity }) => humidity)
            let soilTemp = data.data.map(({ soilTemp }) => soilTemp)
            let soilMoisture = data.data.map(({ soilMoisture }) => scale(soilMoisture,660,200,0,100))
            let soilMoistureRaw = data.data.map(({ soilMoisture }) => soilMoisture)
            console.log('at', airTemp)
            console.log('DA', dataLabels)
            console.log(data)
            var ctx = document.getElementById('tempChart').getContext('2d');
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dataLabels,
              datasets: [{ 
                  data: airTemp,
                  label: "Air Temp",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: soilTemp,
                  label: "Soil Temp",
                  borderColor: "#8e5ea2",
                  fill: false
                }, { 
                  data: humidity,
                  label: "Humidity",
                  borderColor: "#3cba9f",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Temperature and humidity'
              }
            }
          });
          var ctx2 = document.getElementById('moistChart').getContext('2d');
            var myChart = new Chart(ctx2, {
            type: 'line',
            data: {
              labels: dataLabels,
              datasets: [{ 
                  data: soilMoisture,
                  label: "Soil Moisture",
                  borderColor: "#3e95cd",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Soil Moisture'
              }
            }
          });
        });
        
        </script>`+ req.params)
    }
    catch {
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port)
})



