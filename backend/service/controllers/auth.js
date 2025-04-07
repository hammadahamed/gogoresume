const { v4: uuidv4 } = require("uuid");
const JwtWrapper = require("../wrappers/jwt-wrapper");

async function anonymousAuthorize(req, res, next) {
  try {
    const username = req.body.name;

    const payload = {
      userId: uuidv4(),
      anonymousUser: true,
    };

    const appToken = JwtWrapper.generateToken(payload);
    res.status(200).json({ username, token: appToken });
  } catch (error) {
    next(error);
  }
}

async function bootstrap(req, res, next) {
  try {
    const { userData } = req;
    res.json({ ...userData });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  anonymousAuthorize,
  bootstrap,
};
