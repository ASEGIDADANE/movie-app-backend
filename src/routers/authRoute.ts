import { signup, login, logout, checkAuth } from '../controllers/authController';
import express from 'express';
import { protectRoute } from '../middlewares/protectedRoute';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.get('/checkauth',protectRoute, checkAuth);

export default router;


