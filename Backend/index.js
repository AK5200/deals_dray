const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddelware');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
connectDb();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.use('/api/auth', authRoutes);


// Static 
app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('/api/protected', authMiddleware, (req, res) => {
res.json({ message: 'Welcome to home page', user:req.user});    
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
