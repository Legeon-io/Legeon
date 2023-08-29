const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "762015424404-hrcoph6inneq3ajv8a1komestv7i8rl8.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
