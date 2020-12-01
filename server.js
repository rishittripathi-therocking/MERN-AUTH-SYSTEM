const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config({
    path:'./config/configure.env',
})

app.use(bodyParser.json());

connectDB();





const authRouter = require('./routes/auth.route');

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

// Use Routes
app.use('/api', authRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not Found"
    })
})


const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
})

