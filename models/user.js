const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
    },

    password: {
        type: String,
        required: [true, "Password is required."],
    },
});

module.exports = mongoose.model("User", UserSchema);
