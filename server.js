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
}

const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
})

