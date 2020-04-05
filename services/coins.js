"use strict";

const Coin = require("../models/coin");
const axios = require("axios");

module.exports.getCoins = async () => {
    const coins = await axios.get(
        `https://${process.env.API_HOST}/coins?limit=100`,
        {
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": `${process.env.API_HOST}`,
                "x-rapidapi-key": `${process.env.API_KEY}`,
            },
        }
    );
    // for (let coin of coins) {
    // }
    return {
        message: "success",
    };
};

module.exports.createCoin = async (obj) => {
    const coin = new Coin.model({
        ...obj,
        numberOfSubscriptions: 0,
    });
    await coin.save();
    return {
        message: "success",
    };
};
