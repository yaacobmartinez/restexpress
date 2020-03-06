const express = require('express')
const app = express()
const users = require('./routes/users')
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users', users);
app.listen(port, () => console.log(`App running on ${port}`))