require('dotenv').config({ path: './config/.env' });
const jwt = require("jsonwebtoken");


// create Activation Token
const createActivationToken = (user) => {
    const activationToken = jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "5m"});
    return activationToken;
};


module.exports = {createActivationToken};