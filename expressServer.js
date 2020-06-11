const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8000
const {createApiEndPoints} = require('./api')

exports.initExpressServer = () => {

    const teamRunningApp = express()

    teamRunningApp.set('port', process.env.PORT || port)
    teamRunningApp.use(bodyParser.json())
    teamRunningApp.use(morgan('tiny'))
    teamRunningApp.use(cors())

    createApiEndPoints(teamRunningApp)

    teamRunningApp.listen(port, () => {
        console.log(`Server for Team Running Webex Bot listen on port ${port}`)
    })
    return teamRunningApp

}