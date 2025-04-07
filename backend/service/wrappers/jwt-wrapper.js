const config = require("scrumkits-env");
const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwt_secret");

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret);
};

// return the payload in the token
const validateToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error("Invalid or expired token.");
  }
};

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

module.exports = {
  generateToken,
  validateToken,
  getTokenFromHeader,
};
