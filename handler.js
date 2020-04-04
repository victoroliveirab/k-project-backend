"use strict";

const dotenv = require("dotenv");
const axios = require("axios");

// TODO: config file with exports of constants
dotenv.config();

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
