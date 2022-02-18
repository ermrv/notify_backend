const mongoose = require('mongoose');
require('dotenv').config();
const mongoDb = process.env.MONGOURI;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,

    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,

    useUnifiedTopology: true,
    useFindAndModify: false,
}

mongoose.connect(mongoDb, options)
.then(() => console.log("******************************" + "Mongodb Connected" + "******************************")
).catch(err => console.log("Error: " + err));