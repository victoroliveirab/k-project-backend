const mongoose = require("mongoose");
const coinObj = require("./coin");

const coinSchema = coinObj.schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
    },

    password: {
        type: String,
        required: [true, "Password is required."],
    },

    subscriptions: {
        type: [coinSchema],
    },
});

//UserSchema.pre("save", (next) => {});

module.exports = {
    schema: UserSchema,
    model: mongoose.model("User", UserSchema),
};
