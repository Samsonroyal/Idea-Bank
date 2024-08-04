const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Specify the path to the .env file
dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth/register', require('./routes/auth'));
app.use('/api/auth/login', require('./routes/auth'));
app.use('/api/auth/search', require('./routes/auth'));
app.use('/api/ideas', require('./routes/ideas'));


const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('Mongo URI is not defined in environment variables');
  process.exit(1);
}

console.log('Mongo URI:', mongoURI);
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
