const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
    },
    numberOfSubscriptions: {
        type: Number,
    },
});

module.exports = {
    schema: CoinSchema,
    model: mongoose.model("Coin", CoinSchema),
};
