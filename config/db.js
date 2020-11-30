const mongoose = require('mongoose');

const connectDb = async() => {
    const connection = await mongoose.connect(proces.env.Mongo_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })

    console.log(`MongoDB connected ${connection.connection.host}`);
}

module.exports = connectDB;