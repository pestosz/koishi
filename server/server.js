require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

let corsOptions = {
    origin : ['http://127.0.0.1:5500'],
}    

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

//💀💀💀💀💀💀
app.use(cors(corsOptions))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Body', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

//api:

app.get('/api', (req, res) => {
    res.send('Please use /api/event');
});

const remindersRouter = require('./routes/reminders')
app.use('/reminders', remindersRouter)


//start server
app.listen(3000, () => console.log('Server Started'))