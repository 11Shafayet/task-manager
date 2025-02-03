const jwt = require('jsonwebtoken');

// Todo. This is custom make function to create and verify token. If you need to generate and verify token in more than one place then you can use it. In the jwtPayload i used userId and role. You may use different thing. Adjust the code accordingly.

const createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  verifyToken,
};
