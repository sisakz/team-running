const axios = require('axios')

exports.createApiEndPoints = (app) => {
    app.get('/api/help', (req, res, next) => {
        console.log('help')
        res.send('Help')
    })
    app.post('/api/message', (req, res, next) => {
        if (req.body.data) {
            const msg = req.body.data
            console.log(msg)
            const messageId = msg.id
            res.send(messageId)
            const messageApiUrl = "https://api.ciscospark.com/v1/messages"
            const botAccessToken = "NmMwYWZiZDgtOWUyYi00MzI0LWJmYmItYjU2ODA4MzY2NDJjYzg2YWRmMDAtZjJj_PF84_4a05e5c1-65cb-4f86-899f-dbcc12a1af24"
            const config = {
                headers: { Authorization: `Bearer ${botAccessToken}` }
            }
            const axiosInstance = axios.create({
                baseURL: messageApiUrl,
                timeout: 1000,
                headers: {Authorization: `Bearer ${botAccessToken}`}
              });
              axiosInstance.get(messageApiUrl + "/" + messageId)
            .then(response => console.log(response)) 

        }
    })
}

