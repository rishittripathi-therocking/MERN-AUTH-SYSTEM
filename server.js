const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
})