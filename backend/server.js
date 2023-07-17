const express = require('express')
const usersRoutes = require('./routes/users')
const resumesRoutes = require('./routes/resumes')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser');

// express app
const app = express()

// Increase payload size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//enabling cors
app.use(cors());

// middleware
app.use(express.json())
app.use((req, res, next) => { next() })

// routes
app.use('/api/user/', usersRoutes)
app.use('/api/resume/', resumesRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (() => console.log('server is running...')))
    })
    .catch((err) => {
        console.log(err.message)
    })
