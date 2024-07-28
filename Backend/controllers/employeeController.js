const { validationResult } = require('express-validator');
const Employee = require('../models/Employee'); // Adjust the path as necessary

// Controller function for adding an employee
const addEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, mobile, designation, gender } = req.body;
    const courses = req.body.courses;

    // If courses is not an array, convert it to an array
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

module.exports = {
  addEmployee,
};
