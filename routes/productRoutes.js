// routes/productRoutes.js
import express from 'express';
import { upload } from '../config/multerConfig.js';

const router = express.Router();

// Upload endpoint for image
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  res.json({
    message: 'Image uploaded successfully',
    file: req.file
  });
});

export default router;
