const https = require('https')

const url = 'https://api.darksky.net/forecast/a2750c704479fefa55afcc43f92166bb/40,-75?units=auto'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body.daily)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()