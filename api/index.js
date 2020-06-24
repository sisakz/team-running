const axios = require('axios')
const config = require('../config')

exports.createApiEndPoints =  (app) => {
    // only for testing purpose yet
    app.get('/api/help', (req, res, next) => {
        console.log('help')
        res.send('Help')
    })

    // listen for messages to bot
    app.post('/api/message', async (req, res, next) => {
        if (req.body.data) {
            // read message directed to bot from response
            const requestToBot = req.body.data
            const messageId = requestToBot.id
            
            res.send(messageId)
            
            // axios config
            axios.defaults.baseURL = config.apiURL
            axios.defaults.headers = {Authorization: `Bearer ${config.botAccessToken}`}
            axios.defaults.headers.post = {"Content-Type": `application/json`}
            

            //get message details directed to bot
           const message = await getMessage(messageId)
                .catch(err => console.log(err))
           console.log("message", message)
           if (message) {
               console.log("person id", message.person.id)
                if (!(message.person.id=="Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OL2YzYjA3YmQzLTY4YmItNGJhOS04NzBjLTkzMTM3YmYyMzJlYQ")) {
                    console.log("sending")
                    sendMessage(message.roomId, `Message from Team Running Bot: ${message.text}`)
                }
                else console.log("not sending")
            }

        }
    })
}

const getMessage = messageId => new Promise(async (resolve, reject) => {
    console.log("getMEssage")
    try {
        const response = await axios.get(`messages/${messageId}`)    
        if (response.data) {
            let message = {}
            message.text = response.data.text
            message.roomId = response.data.roomId
            console.log("personId: ", response.data.personId)
            message.person = await getPerson(response.data.personId)

            .catch(err => console.log(err))
            resolve(message)
        }
        else {
            console.log("try error")
            reject()
        }
    }
    catch (err) {
        if (err.response) {
            console.error({status: err.response.status, statusText: err.response.statusText})
         }
         else console.log("Unexpected error occured when getting sender details!")
         reject()
    }

})

const axiosRequest = (req) => new Promise(async (resolve, reject) => {
    try {
        const response = await req()
        resolve(response)
    }
    catch (err) {
        if (err.response) {
           console.error({status: err.response.status, statusText: err.response.statusText})
        }
        else console.error("Unexpected error occured when getting sender details!")
        reject()
    }

}) 

const getPerson2 =  async personId => {
    const req = () => axios.get(`people/${personId}`)
    const response = await axiosRequest(req)
    if (response) {
        const person = {
            id: response.data.id,
            email: response.data.emails[0],
            name: `${response.data.firstName} ${response.data.lastName}`
        }        
        return person
    }
}



const getPerson =  personId => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(`people/${personId}`)    
        const person = {
            id: response.data.id,
            email: response.data.emails[0],
            name: `${response.data.firstName} ${response.data.lastName}`
        }
        resolve(person)
    }
    catch (err) {
        if (err.response) {
           console.error({status: err.response.status, statusText: err.response.statusText})
        }
        else console.log("Unexpected error occured when getting sender details!")
        reject()
    }

})

const sendMessage =  (roomId, text) => new Promise(async (resolve, reject) => {
    try {
        console.log("roomId", roomId)
        const response = await axios.post(`messages`, {roomId, text})    
        resolve(response)
    }
    catch (err) {
        if (err.response) {
           console.log(err)
           console.error({status: err.response.status, statusText: err.response.statusText})
        }
        else console.log("Unexpected error occured when sending bot message!", err)
        reject()
    }

})


