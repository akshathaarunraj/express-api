const passport = require('passport');
const User = require("../models/auth.model");

exports.signup = (req, res) => {
  // 1. get the form data
  console.log(req.body);
  // 2. save the name, email in the database 
  // 3. encrypt the password.  (get salt and hash)
  // 4. save the salt and hash in the database. NEVER save password
  const userDao = new User(req.body);
  userDao.encryptPassword(req.body.password);
  userDao.save()
    .then((user) => {
      // TODO: send the email to the user using sendgrid
      res.json({
        email: user.email,
        message: "Signup successful!. Please verify your email to activate your account",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

exports.login = (req, res) => {
  // 1. get the form data
  console.log(req.body);
  
  passport.authenticate('local', (err, user, info) => {
    // if user not found -- or password is wrong
    if(err) {
      console.log(err);
      res.json(err);
    } 

    // if the user account is found
    if(user) {
      // generate JWT (JSON Web Token) and send it as res 
      console.log(user);
      const authToken = user.generateJwt();
      res.json({
        authToken: authToken,
      });
    }
  })(req, res);
  
}

