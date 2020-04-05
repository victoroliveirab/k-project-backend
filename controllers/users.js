const dbConnection = require("../config/db");
const { createUser, subscribeToCoin } = require("../services/users");

module.exports.createUser = async (event, context, callback) => {
    await dbConnection();
    const { username, password } = JSON.parse(event.body);
    const createUserResponse = await createUser(username, password);
    return {
        statusCode: 200,
        body: JSON.stringify(createUserResponse),
    };
};

module.exports.subscribeToCoin = async (event, context, callback) => {
    await dbConnection();
    const { id } = event.pathParameters;
    await subscribeToCoin(parseInt(id));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "ok",
        }),
    };
};
