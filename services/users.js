"use strict";

const UserModel = require("../models/user");
const { hashPassword, generateJwt } = require("../utils/jwt/index");

module.exports.createUser = async (username, password) => {
    const hashed = hashPassword(password);
    const user = new UserModel({ username, password: hashed });
    await user.save();
    return {
        message: "success",
        token: generateJwt(user.id),
    };
};
