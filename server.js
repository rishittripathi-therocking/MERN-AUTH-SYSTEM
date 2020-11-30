const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config({
    path:'./config/configure.env'
})

app.use(bodyParser.json());

connectDB();





if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.client_URL
    }))

    app.use(morgan('dev'));
}

app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    })
})

const authRouter = require('./routes/auth.route');


app.use('/api/', authRouter);


const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
})

