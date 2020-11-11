res.send(`<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script><h1>indexsdd</h1><canvas id="myChart" width="300" height="100"></canvas>
        <script>
        
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            let dataLabels = data.labels.map(({ createdAt }) => createdAt)
            let airTemp = data.data.map(({ airTemp }) => airTemp)
            let humidity = data.data.map(({ humidity }) => humidity)
            let soilTemp = data.data.map(({ soilTemp }) => soilTemp)
            let soilMoisture = data.data.map(({ soilMoisture }) => soilMoisture)
            console.log('at', airTemp)
            console.log('DA', dataLabels)
            console.log(data)
            var ctx = document.getElementById('myChart').getContext('2d');
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
                }, { 
                  data: soilMoisture,
                  label: "Soil Moisture",
                  borderColor: "#e8c3b9",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'World population per region (in millions)'
              }
            }
          });
        });
        
        </script>`+ req.params)