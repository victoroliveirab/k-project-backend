"use strict";

const axios = require("axios");

// This is just a test to the API
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
