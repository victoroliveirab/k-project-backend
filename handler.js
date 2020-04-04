"use strict";

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const axios = require("axios");

const UserModel = require("./models/user");

// TODO: config file with exports of constants
dotenv.config();
mongoose.connect(`${process.env.DB_URL}`);

module.exports.hello = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message:
                    "Go Serverless v1.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };
};

module.exports.getBTC = async (event, context, callback) => {
    let response;
    await axios
        .get(`https://${process.env.API_HOST}/coin/1`, {
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": `${process.env.API_HOST}`,
                "x-rapidapi-key": `${process.env.API_KEY}`,
            },
        })
        .then((res) => (response = res.data))
        .catch((err) => console.log(err));
    return {
        statusCode: 200,
        body: JSON.stringify({ response }),
    };
};

module.exports.createUser = async (event, context, callback) => {
    const user = new UserModel(JSON.parse(event.body));
    await user.save();
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "success" }),
    };
};
