import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoute from './routers/authRoute';
import movieRoute from './routers/movieRoute';
import tvRoute from './routers/tvRoute';
import searchRoute from './routers/searchRoute';

import { protectRoute } from './middlewares/protectedRoute';
dotenv.config();
const app = express();

connectDB();

// middleware
app.use(express.json());

// routes
app.use('/api/v3/auth',authRoute); 
app.use('/api/v3/movies',protectRoute,movieRoute);
app.use('/api/v3/tv',protectRoute,tvRoute);
app.use('/api/v3/search',protectRoute,searchRoute);



const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});