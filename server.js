//importing dependencies 
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


//Initialiing the application
const app = express();


app.use(express.json()); // for parsing JSON body
app.use(morgan('dev'));
app.use(cors());
app.use(helmet()); //  To secure HTTP headers



// Serve static files from uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes Mounting 
app.use('/api/products', productRoutes);


//listen to the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
