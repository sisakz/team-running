const {initDatabase} = require('./db')
const {initExpressServer} = require('./expressServer')

console.log('OK')

initDatabase()
const app = initExpressServer()






