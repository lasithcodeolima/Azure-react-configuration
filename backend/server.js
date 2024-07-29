const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
