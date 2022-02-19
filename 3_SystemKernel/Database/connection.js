const mongoose = require('mongoose');
require('dotenv').config();
const mongoDb = process.env.MONGOURI;

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,

    
    
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,

    useUnifiedTopology: true,
}

mongoose.connect(mongoDb, options)
.then(() => console.log("******************************" + "Mongodb Connected" + "******************************")
).catch(err => console.log("Error: " + err));