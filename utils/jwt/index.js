const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.TOKEN_SECRET;
const saltRounds = 10;

module.exports.hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));

module.exports.generateJwt = (id) =>
    jwt.sign({ id }, secret, {
        expiresIn: 86400 * 100, // only dev
    });
