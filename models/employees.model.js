// import mongoose from mongoose
// Create a schema for the employees collection
const mongoose = require("./mongo");

// Let's have the schema for the collection
const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: String,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now },
  },
  {
    strict: false, // if true only the fields specified in the schema will be saved to the database
  },
);

// Employee -- will become plural automatically. it is the collection name
module.exports = mongoose.model("Employee", employeeSchema);
