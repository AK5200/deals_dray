const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee data' });
  }
};

// Add an employee
const addEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const coursesArray = Array.isArray(courses) ? courses : [courses];

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: coursesArray,
      image: req.file ? req.file.path : null,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error saving employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, courses } = req.body;
    const coursesArray = Array.isArray(courses) ? courses : [courses];
    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses: coursesArray,
    };
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
