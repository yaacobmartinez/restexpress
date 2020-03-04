require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose');
const usersRouter = require('./routes/users')
const app = express()
var port = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;

db.once('open', () => console.log('connected to database'))
app.use(express.json())
app.use('/api/users', usersRouter)
app.get('/',(req, res) => res.json({  success:true, message: "Use the API Endpoint to access data" }));
// Launch app to listen to specified port
app.listen(port, ()=>{
    console.log("Starting at Port " + port)
});

