const mongoose = require("mongoose");
const mongoConfig = require("../config/mongo.config.json");

mongoose
  .connect(mongoConfig.dbUrl, mongoConfig.options)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB NOT Connected");
    console.log(err);
  });

// when connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Connection Closed via app termination");
    process.exit(0); // 0 is an exit code for a successful termination
  } catch (err) {
    console.log("Error occurred while closing the connection");
    console.log(err);
    process.exit(1); // 1 is an exit code for an unsuccessful termination
  }
});

module.exports = mongoose;
