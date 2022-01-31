const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const fileupload = require("express-fileupload");
const cors = require("cors");

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(fileupload());

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/add', require('./routes/routesUpload'))
app.use('/api/add', require('./routes/routesDelete'))


async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
        })
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    } catch (err) {
        console.log(error(err))
    }
}
start()