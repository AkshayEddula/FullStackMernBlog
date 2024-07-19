import express from 'express'
import { editPost, editPost2, forgotPassword, getMe, Login, LogOut, signUp } from '../controllers/authControllers.js';
import jwt from 'jsonwebtoken'
import authenticateToken from '../middleWare/authenticateToken.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',Login);
router.get('/logout',LogOut);
router.get('/profile/:id', authenticateToken, getMe);
router.get('/profile/editprofile/:userId', authenticateToken, editPost);
router.put('/profile/editprofile/:userId', authenticateToken, editPost2);
router.put('/forgotpassword', forgotPassword);
router.get('/verifyToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json(user);
    });
});

export default router;