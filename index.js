// Main starting point of the application
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

//connect to the DB
mongoose.connect('mongodb://localhost:auth/auth')
mongoose.Promise = global.Promise

// App Setup
app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
    console.log('Server listening on:', port)
})
