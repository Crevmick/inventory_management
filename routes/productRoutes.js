import express from 'express';
import { upload } from '../middleware/multerConfig.js';
import { createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct  } from '../controller/productController.js';
import  authenticateUser from '../middleware/authenticateUser.js';
const router = express.Router();

// Endpoint to create productn]
router.post('/products', upload.single('image'), authenticateUser ,  createProduct);
router.put('/products/:id', upload.single('image'), authenticateUser , updateProduct);
router.delete('/products/:id', authenticateUser, deleteProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);


export default router;
