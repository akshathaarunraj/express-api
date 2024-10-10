const passport = require("passport");
const LocalStrategy = require("passport-local"); // email, password based auth

const User = require("../models/auth.model");

// basic strategy config for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      console.log(email, password); // entered email and password by the user to login

      User.findOne({ email: email })
        .then((user) => {
          console.log(user);
          // if the user is found
          // validate the password by hitting isPasswordMatching()
          if (!user.isPasswordMatching) {
            // if p/w is wrong -- return error
            return done(null, false, { message: "Password is wrong" });
          }
          // if password is valid and matching
          return done(null, user);
        })
        .catch((err) => {
          // if the user is not found
          console.log(err);
          return done(null, false, { message: "Invalid email or password" });
        });
    }
  )
);

// DO NOT FORGET TO CHECK app.js -- related to passport config
