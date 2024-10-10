const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("./mongo");

// Let's have the schema for the collection
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: String,
    hash: String,
    isActive: Boolean, // if the user is deleted, it will be false
    isEmailVerified: Boolean, // if email is verified, it will be true
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now },
  }, {
    strict: true
  }
);

// to convert the password into salt and hash 
userSchema.methods.encryptPassword = function (password) {
  // it should not be arrow function. if so, 'this' keyword wont be available
  // let's get the password
  console.log(password);
  // convert the above password into salt and hash
  console.log(this); // will have the userDao object
  // let's generate salt
  this.salt = crypto.randomBytes(399).toString("hex");
  console.log(this.salt);
  // using the salt, we can generate the hash
  // password based key derivation function 2 -- part of crypto
  this.hash = crypto.pbkdf2Sync(password, this.salt, 73958, 581, "sha512").toString("hex");
}

// validate the password -- login 
userSchema.methods.isPasswordMatching = function(password) {
  console.log(password);
  // we will access already saved salt of user
  console.log(this.salt);
  // access already saved hash
  console.log(this.hash);
  // newly generating hash
  const hash = crypto.pbkdf2Sync(password, this.salt, 73958, 581, "sha512").toString("hex");
  return this.hash === hash;
}

// generate token
userSchema.methods.generateJwt = function() {
  // today's date and time
  const tokenExpiryDate = new Date(); 
  tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 90); // setting 90 days
  console.log(tokenExpiryDate);

  // signing the payload with secret
  return jwt.sign({
    id: this._id, // user's id saved in db
    email: this.email,
    // JWT expects expiry time to be in seconds; not milliseconds. 
    // by dividing the millisoconds by 1000, we can get the seconds.
    // 10 is radix -- that will give full number. not floating point.
    exp: parseInt(tokenExpiryDate.getTime() / 1000, 10), 
  }, "Life Is Beautiful!!!"); // secret  
}

module.exports = mongoose.model("User", userSchema);

