import express from 'express';
import dotenv from 'dotenv';
import shoeRoutes from './routes/shoe.route.js'


import { connectToDB } from './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());


// Connect to MongoDB
await connectToDB();



// mount the shoe routes here under /api
app.use('/api',shoeRoutes )

// Basic route
app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the Shoe store API"
    })
})

// start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`);
    
})