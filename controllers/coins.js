const dbConnection = require("../config/db");
const { createCoin, findCoinSavedByName } = require("../services/coins");

module.exports.createCoin = async (event, context, callback) => {
    await dbConnection();
    const { name, symbol, id, color } = JSON.parse(event.body);
    try {
        const response = await createCoin({ name, symbol, id, color });
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (e) {
        return {
            statusCode: 403,
            body: JSON.stringify(e),
        };
    }
};

module.exports.findCoin = async (event, context, callback) => {
    await dbConnection();
    const { query } = event.queryStringParameters;
    try {
        const dbResponse = await findCoinSavedByName(query);
        return {
            statusCode: 200,
            body: JSON.stringify(dbResponse),
        };
    } catch (e) {
        // to do: work better error handling
        return {
            statusCode: 404,
            message: e.message,
        };
    }
};
