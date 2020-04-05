const dbConnection = require("../config/db");
const { createCoin } = require("../services/coins");

module.exports.createCoin = async (event, context, callback) => {
    await dbConnection();
    const { name, symbol, id, color } = JSON.parse(event.body);
    const createCoinResponse = await createCoin({ name, symbol, id, color });
    return {
        statusCode: 200,
        body: JSON.stringify(createCoinResponse),
    };
};
