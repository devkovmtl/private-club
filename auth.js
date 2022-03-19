const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, done) => {
  User.findById(user.id, (err, user) => {
    return done(null, { id: user.id, username: user.username });
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid credentials' });
          }
        });
      });
    }
  )
);
