import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../db/models/users.js";
import {} from "dotenv/config"; // For .env variables to work

const secret = process.env.JWT_SECRET;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ where: { email: payload.email } })
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized (auth)",
        data: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
