const express = require("express");
// custom import 
const employeesController = require("../../../controllers/employees.controller");

const router = express.Router();

// api endpoint for listing employees -- localhost:3001/api/v1/employees - GET Method
router.get("/", employeesController.getEmployees);

router.post("/", employeesController.addEmployee);

router.get("/:id", employeesController.getEmployeeDetails);

router.put("/:id", employeesController.updateEmployeeDetails);

// TODO: Try to implement DELETE method

module.exports = router;
