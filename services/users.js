"use strict";

const User = require("../models/user");
const { hashPassword, generateJwt } = require("../utils/jwt/index");

module.exports.createUser = async (username, password) => {
    const hashed = hashPassword(password);
    const user = new User.model({
        username,
        password: hashed,
        subscriptions: [],
    });
    await user.save().catch((err) => {
        throw err;
    });
    return {
        message: "success",
        token: generateJwt(user.id),
    };
};

module.exports.subscribeToCoin = async (id) => {};
