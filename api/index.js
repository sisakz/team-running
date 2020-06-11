exports.createApiEndPoints = (app) => {
    app.get('/api/help', (req, res, next) => {
        console.log('help')
        res.send('Help')
    })
    app.post('/api/message', (req, res, next) => {
        if (req.body.data) {
            const msg = req.body.data
            console.log(msg)
            res.send(msg)
        }
    })
}

