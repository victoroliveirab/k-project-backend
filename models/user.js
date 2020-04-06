const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const Coin = require("./coin");

const CoinSchema = Coin.schema;

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
        type: [CoinSchema],
    },
});

//UserSchema.pre("save", (next) => {});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, correct) => {
        if (err) return callback(err);
        callback(null, correct);
    });
};

UserSchema.set("timestamps", true);
UserSchema.plugin(uniqueValidator);

module.exports = {
    schema: UserSchema,
    model: mongoose.model("User", UserSchema),
};
