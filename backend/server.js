const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
connectDb();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/calculations',require('./routes/calculationRoutes'));

const  PORT = process.env.port ||5000;
app.listen(PORT,()=>{
    console.log('Server is running on port ',PORT);
})