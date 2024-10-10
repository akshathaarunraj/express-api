const { expressjwt } = require("express-jwt");

const getTokenFromHeaders = (req) => {
  const {headers: {authorization}} = req;

  // how the front end will the token 
  // authorization: "Bearer x.y.z" // x.y.z is token
  if(authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1]; // returning actual jwt
  }

  return null;
}

const auth = {
  // starting the decoding of the JWT
  required: expressjwt({
    secret: "Life Is Beautiful!!!",
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: true,
  }),
  optional: expressjwt({
    secret: "Life Is Beautiful!!!",
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;