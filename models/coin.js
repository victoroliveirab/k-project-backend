const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
    numberOfSubscriptions: {
        type: Number,
    },
});

CoinSchema.set("timestamps", true);
CoinSchema.plugin(uniqueValidator);

module.exports = {
    schema: CoinSchema,
    model: mongoose.model("Coin", CoinSchema),
};
