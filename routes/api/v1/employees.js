var express = require("express");
var router = express.Router();

// api endpoint for listing employees -- localhost:3001/api/v1/employees - GET Method
router.get("/", (req, res, next) => {
  const employeeList = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      phone: "9876543210",
    },
  ];
  res.json(employeeList);
});

router.post("/", (req, res, next) => {
  // get the form data from the request body
  console.log(req.body); // because of body-parser middleware -- we can get this data 
  // construct a new employee object as response
  res.json({
    ...req.body,
    id: 100
  });
});

router.get("/:id", (req, res, next) => { // id is the url parameter
  console.log(req.params);  // we can get the id from the url parameter
  // get the employee details from the database
  const employee = {
    id: parseInt(req.params.id),
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
  };
  res.json(employee);
});

router.put("/:id", (req, res, next) => {
  // get the url parameter
  console.log(req.params.id);

  // get the form data from the request body
  console.log(req.body);

  const updatedEmployee = {
    id: parseInt(req.params.id),
    ...req.body
  };

  // update the employee details in the database
  res.json(updatedEmployee);
});

// TODO: Try to implement DELETE method

module.exports = router;
