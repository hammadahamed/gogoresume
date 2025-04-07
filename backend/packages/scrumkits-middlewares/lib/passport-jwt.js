const config = require("scrumkits-env");
const { ExtractJwt, Strategy } = require("passport-jwt");
const passportCustom = require("passport-custom");

const CustomStrategy = passportCustom.Strategy;

function passportJWT(passport) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get("app_secret"),
  };

  passport.use(
    new Strategy(options, (jwtPayload, done) => {
      try {
        if (jwtPayload) {
          done(null, jwtPayload);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    })
  );

  passport.use(
    new CustomStrategy((req, done) => {
      if (req.query && req.query.client_id) {
        const response = { clientId: req.query.client_id };
        done(null, response);
      } else {
        done(null, false);
      }
    })
  );
}

module.exports = passportJWT;
