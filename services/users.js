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

module.exports.login = async (username, password) => {
    let user = {};
    await User.model.findOne({ username }, (err, userFound) => {
        if (err) throw err;
        userFound.comparePassword(password, (err, correct) => {
            if (err) throw err;
            if (correct) {
                user.id = userFound._id;
                user.subscriptions = userFound.subscriptions;
                user.token = generateJwt(user.id);
            }
        });
    });
    return user;
};

module.exports.subscribeToCoin = async (id) => {};
