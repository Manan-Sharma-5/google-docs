require('dotenv').config()
const express = require('express')
const authenticationRoute = require('./routes/AuthenticationRoute')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/', authenticationRoute)

module.exports = app