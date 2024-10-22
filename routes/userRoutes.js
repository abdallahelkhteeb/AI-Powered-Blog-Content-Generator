const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();


const jwt = require('jsonwebtoken');
const protectRoute = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};


router.post('/register', registerUser);
router.post('/login', loginUser);

// Protect routes for logged-in users
router.post('/createPost', protectRoute, createPost);
router.put('/updatePost/:id', protectRoute, updatePost);
router.delete('/deletePost/:id', protectRoute, deletePost);

module.exports = router;

