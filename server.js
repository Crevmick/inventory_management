//importing dependencies 
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

//importing Route
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoute.js'
import registerRoute from './routes/registerRoute.js'

import { sequelize, testConnection } from './config/db.js';


dotenv.config();


//Initialiing the application
const app = express();


//middleware
app.use(express.json()); // for parsing JSON body
app.use(morgan('dev'));
app.use(cors());
app.use(helmet()); //  To secure HTTP headers



// Serve static files from uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes Mounting 
app.use('/auth', registerRoute)
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

await sequelize.sync({ alter: true });

//listen to the server
const PORT = process.env.PORT || 4000;


// Wrapping app start in async function to await DB connection
async function startServer() {
    await testConnection();
    
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

startServer();
