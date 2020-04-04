const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
    let isConnected;
    if (isConnected) {
        return Promise.resolve();
    }
    const database = await mongoose.connect(process.env.DB_URL);
    isConnected = database.connections[0].readyState;
};

module.exports = connectToDatabase;
