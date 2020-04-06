"use strict";

const Coin = require("../models/coin");
const axios = require("axios");

module.exports.createCoin = async (coin) => {
    const { id, symbol, name, color, iconUrl } = coin;
    const newCoin = new Coin.model({
        id,
        symbol,
        name,
        color,
        icon: iconUrl,
        numberOfSubscriptions: 0,
    });
    const coinSaved = await newCoin.save().catch((err) => {
        console.error(err);
        throw err;
    });
    return coinSaved;
};

module.exports.get100Coins = async (regex) => {
    try {
        const response = await axios.get(
            `https://${process.env.API_HOST}/coins?limit=100`,
            {
                headers: {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": `${process.env.API_HOST}`,
                    "x-rapidapi-key": `${process.env.API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        // find correct status code for this error
        // use 503 - Service Unavailable (?)
        console.error(err);
        throw err;
    }
};

module.exports.findCoinSavedByName = async (queryString) => {
    let coins;
    await module.exports
        .get100Coins()
        .then((data) => (coins = data.data.coins))
        .catch((err) => {
            throw err;
        });

    const regex = new RegExp(`${queryString}`, "gi");
    const foundCoins = coins.filter((coin) => regex.test(coin.slug));
    if (foundCoins.length === 0) {
        throw new Error("This coin does not exist or is too obscure to find.");
    }

    const query = Coin.model.find({ name: regex });
    const registeredCoins = await query.exec();
    for (let coin of foundCoins) {
        if (
            !registeredCoins.find(
                (registeredCoin) => registeredCoin.id === coin.id
            )
        ) {
            registeredCoins.push(await module.exports.createCoin(coin));
        }
    }
    return {
        message: "success",
        data: registeredCoins.map(
            ({ _id, name, icon, color, symbol, numberOfSubscriptions }) => ({
                id: _id,
                name,
                icon,
                color,
                symbol,
                numberOfSubscriptions,
            })
        ),
    };
};
