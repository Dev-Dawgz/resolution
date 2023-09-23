const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database/index');
require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email']
    },
    async (req, accessToken, refreshToken, profile, done) => {

      const defaultUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id
      };


      // check if the user already exists in the database, if not create one
      const user = await Users.findOrCreate({ where: { googleId: profile.id }, defaults: defaultUser }).catch((err) => {
        console.error(err);
        done(err, null);
      });

      if (user && user[0]) {
        return done(null, user && user[0]);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // serialize the user object and store it in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // retrieve the user object from the session based on the serialized ID
  const user = await Users.findOne({ where: { id } }).catch((err) => {
    console.error(err);
    done(err, null);
  });

  if (user) {
    done(null, user);
  }
});

module.exports = passport;
