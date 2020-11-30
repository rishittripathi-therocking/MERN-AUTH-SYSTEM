const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config({
    path:'./config/config.env'
})
const app = express()

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



const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
})

