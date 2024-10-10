
const Employee = require("../models/employees.model")
exports.getEmployees = (req, res) => {
  // 1. get the request from routes
  // 2. connect to database
  // 3. get all employees from the database
  // 4. send the employee list to the routes
  Employee.find().then((employees) => {
    res.json(employees);
  }).catch((err) => {
    res.status(500).json({ message: err.message })
  });
}
exports.addEmployee = (req, res) => {
  // 1. get the request from routes and req.body
  console.log("req body", req.body); // because of body-parser middleware -- we can get this data
  // 2. connect to database
  // 3. add the employee to the database
  const employeeData = new Employee(req.body);
  // 4. send the employee details to the routes
  employeeData.save().then((employee) => {
    res.json(employee)
  }).catch((err) => {
    res.status(500).json({ message: err.message })
  });
  // get the form data from the request body
  // construct a new employee object as response
}
exports.getEmployeeDetails = (req, res) => {
  // id is the url parameter
  console.log(req.params); // we can get the id from the url parameter
  // get the employee details from the database
  Employee.findOne({ _id: req.params }).then((employee) => {
    res.json(employee);
  }).catch((err) => {
    res.status(500).json({ message: err.message })
  });
}
exports.updateEmployeeDetails = (req, res) => {
  // get the url parameter
  console.log(req.params.id);
  // get the form data from the request body
  console.log("req",req.body);
  Employee.findOneAndUpdate({ _id: req.params.id },req.body,{ new: true }).then((employee) => {
    res.json(employee);
  }).catch((err) => {
    res.status(500).json({ message: err.message })
  });
}

// TODO: Do it for DELETE method
exports.deleteEmployeeDetails = (req, res) => {
 const employeeId = req.params.id;
 console.log("Employee ID:", employeeId);
 Employee.findByIdAndDelete(employeeId)
   .then((employee) => {
     if (!employee) {
       return res.status(404).json({ message: "Employee not found" });
     }
     res.json({ message: "Employee deleted successfully", employee });
   })
   .catch((err) => {
     console.error("Error deleting employee:", err);
     res.status(500).json({ message: err.message });
   });
};
