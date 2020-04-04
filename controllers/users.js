const dbConnection = require("../config/db");
const { createUser } = require("../services/users");

module.exports.createUser = async (event, context, callback) => {
    await dbConnection();
    const { username, password } = JSON.parse(event.body);
    const createUserResponse = await createUser(username, password);
    return {
        statusCode: 200,
        body: JSON.stringify(createUserResponse),
    };
};
