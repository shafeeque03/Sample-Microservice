import express from "express";
import { getAllUsers, getProfile, login, register } from "../controllers/userController.js";
import { authMiddleware } from "../auth.js";

const router = express.Router();

// Auth routes - public
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.get('/all', authMiddleware, getAllUsers);

export default router