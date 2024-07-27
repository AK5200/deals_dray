const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/Admin');
const SECRET = "Secret_Key";

// register admin
module.exports.register = async (req, res) => {
    const { email, password } = req.body;

    try{

        let admin = await adminModel.findOne({ email });
        if(admin) {
            return res.status(409).json({ message: 'Admin already exists, Please login' });
        }

        bcrypt.hash(password,10, async (err, hash) => {
            const newAdmin = await adminModel.create({email, password: hash});
            let token = jwt.sign({ id: newAdmin._id }, SECRET);
            res.json({token})
    });

    

} catch (error) {
    res.status(500).json({ message: error.message });
 }
};


module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        let admin = await adminModel.findOne({ email });
        if(!admin) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: admin._id }, SECRET);
        res.json({token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

