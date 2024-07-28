const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController'); // Import the entire module

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/employees',
  upload.single('image'),
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('mobile').matches(/^\d{10}$/).withMessage('Mobile must be 10 digits'),
    body('designation').not().isEmpty().withMessage('Designation is required'),
    body('gender').not().isEmpty().withMessage('Gender is required'),
    body('courses').not().isEmpty().withMessage('At least one course is required'),
  ],
  employeeController.addEmployee // Use the function from the imported module
);

router.get('/employees', employeeController.getAllEmployees); // Use the function from the imported module

module.exports = router;
