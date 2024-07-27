const mongoose = require('mongoose');

// Connect to MongoDB
const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/deals_dray');

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};


module.exports = connectDb;