import express from 'express';
import { loginUser } from '../controller/Auth/signinController.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;
