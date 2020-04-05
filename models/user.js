const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinObj = require("./coin");

const coinSchema = coinObj.schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
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

UserSchema.plugin(uniqueValidator);

module.exports = {
    schema: UserSchema,
    model: mongoose.model("User", UserSchema),
};
