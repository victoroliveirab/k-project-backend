//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGEwMDA0NjkxNWUwMDRkNmVjOWRhOCIsImlhdCI6MTU4NjEwMjI3NiwiZXhwIjoxNTg2MTg4Njc2fQ.bh8scgGy-YbtfI-PK6ZesdP8ZKXRYi19tWJdcUYplfg

const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.TOKEN_SECRET;

module.exports.checkJwt = async (event, context, callback) => {
    const authorizationToken = event.authorizationToken;
    const token = authorizationToken.split(" ")[1];
    jwt.verify(token, secret, null, (err, decoded) => {
        if (err) return callback("Unauthorized");
        callback(null, {
            principalId: decoded.id,
            policyDocument: {
                Version: "2020-04-04",
                Statement: [
                    {
                        Action: "lambda:InvokeFunction",
                        Effect: "Allow",
                        Resource: event.methodArn,
                    },
                ],
            },
            context,
        });
    });
};
