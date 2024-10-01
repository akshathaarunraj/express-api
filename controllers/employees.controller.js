
exports.getEmployees = (req, res) => {
  // 1. get the request from routes
  // 2. connect to database
  // 3. get all employees from the database
  // 4. send the employee list to the routes
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
} 

exports.addEmployee = (req, res) => {
  // 1. get the request from routes and req.body
  // 2. connect to database
  // 3. add the employee to the database
  // 4. send the employee details to the routes
  // get the form data from the request body
  console.log(req.body); // because of body-parser middleware -- we can get this data
  // construct a new employee object as response
  res.json({
    ...req.body,
    id: 100,
  });
}

exports.getEmployeeDetails = (req, res) => {
  // id is the url parameter
  console.log(req.params); // we can get the id from the url parameter
  // get the employee details from the database
  const employee = {
    id: parseInt(req.params.id),
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
  };
  res.json(employee);
}

exports.updateEmployeeDetails = (req, res) => {
  // get the url parameter
  console.log(req.params.id);

  // get the form data from the request body
  console.log(req.body);

  const updatedEmployee = {
    id: parseInt(req.params.id),
    ...req.body,
  };

  // update the employee details in the database
  res.json(updatedEmployee);
}

// TODO: Do it for DELETE method