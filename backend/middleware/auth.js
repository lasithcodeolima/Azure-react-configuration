const jwt = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.decode(token, { complete: true });

    const azureJwksUri = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/discovery/v2.0/keys`;
    const { data: keys } = await axios.get(azureJwksUri);
    const publicKey = keys.keys.find(key => key.kid === decoded.header.kid);

    if (!publicKey) {
      return res.status(401).json({ msg: 'Token verification failed' });
    }

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, async (error, user) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      }

      const dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        return res.status(401).json({ msg: 'User not found in database' });
      }

      req.user = dbUser;
      next();
    });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
