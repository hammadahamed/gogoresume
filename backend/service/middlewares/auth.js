const JwtWrapper = require("../wrappers/jwt-wrapper");

const authHandler = (req, res, next) => {
  try {
    const token = JwtWrapper.getTokenFromHeader(req);
    if (!token) {
      next();
      return;
    }
    const tokenData = JwtWrapper.validateToken(token);
    req.userData = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};

const parseToken = (token) => {
  try {
    if (!token) {
      return false;
    }
    const tokenData = JwtWrapper.validateToken(token);
    return tokenData;
  } catch (error) {
    throw new Error("Auth Failed");
  }
};

const authValidate = (req, res, next) => {
  try {
    if (!req.userData)
      throw new Error("Token not available. User not Authorized");
    else next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authHandler, authValidate, parseToken };
