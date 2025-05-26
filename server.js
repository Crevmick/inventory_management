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
import categoryRoutes from './routes/categoryRoute.js';
import registerRoute from './routes/registerRoute.js';
import signinRoute from './routes/signinRoute.js';

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
app.use('/auth', signinRoute);

await sequelize.sync({ alter: true });

//listen to the server
const PORT = process.env.PORT || 4000;


// Default route for testing
app.get('/', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Store front API</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background-color: #f4f4f9;
              color: #333;
            }
            h1 {
              color: #4CAF50;
            }
            p {
              font-size: 18px;
            }
            a {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to the Inventory Management API!</h1>
          <p>Status: <span style="color: green;">Success</span></p>
          <p>To view the API documentation, click below:</p>
          <p><a href="https://documenter.getpostman.com/view/43171328/2sB2qcCgRX" target="_blank">View API Documentation</a></p>
        </body>
      </html>
    `);
  });
  

// Wrapping app start in async function to await DB connection
async function startServer() {
    await testConnection();
    
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}

startServer();
