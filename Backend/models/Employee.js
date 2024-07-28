const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
  },
  courses: {
    type: [String],
    required: [true, 'At least one course is required'],
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
