const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
require('dotenv').config();

const authenticate = async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios.get(`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/openid-configuration`);
        const jwksUri = response.data.jwks_uri;

        const decodedToken = jwt.decode(token);

        if (!decodedToken) {
            return res.status(401).send('Invalid token');
        }

        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'Authenticated successfully', user });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

module.exports = { authenticate };
