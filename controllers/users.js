const dbConnection = require("../config/db");
const { createUser, login, subscribeToCoin } = require("../services/users");
const { checkJwtAndId } = require("../utils/auth/handler");

module.exports.createUser = async (event, context, callback) => {
    await dbConnection();
    const { username, password } = JSON.parse(event.body);
    try {
        const response = await createUser(username, password);
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

module.exports.login = async (event, context, callback) => {
    await dbConnection();
    const { username, password } = JSON.parse(event.body);
    try {
        const response = await login(username, password);
        if (response.id) {
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        } else {
            return {
                statusCode: 403,
                body: JSON.stringify({ message: "Wrong username or password" }),
            };
        }
    } catch (e) {
        return {
            statusCode: 403,
            body: JSON.stringify(e),
        };
    }
};

module.exports.subscribeToCoin = async (event, context, callback) => {
    // Still to implemenet
    await dbConnection();
    //const x = checkJwtAndId(event, context, callback);
    const { id, coinId } = event.pathParameters;
    await subscribeToCoin(parseInt(id));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "ok",
        }),
    };
};
