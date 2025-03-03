const express = require('express');
const router = express.Router();

const UserController = (UserService) => {
    router.post('/register', async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        try {
            const userData = { 
                email, 
                password, 
                firstName,
                lastName
            };
            const newUser = await UserService.registerUser(userData);
            res.status(201).json({ 
                message: 'User registered successfully', 
                userId: newUser.id 
            });
        } catch (error) {
            if (
                error.code === 'P2002' && 
                error.message.includes('email')
            ) {
                return res.status(409).json({ 
                    error: 'Email already taken', 
                    message: 'A user with this email already exists' 
                });
            }
            
            console.error('Registration error:', error);
            res.status(500).json({ 
                error: 'Error registering user', 
                message: error.message 
            });
        }
    });

    return router;
};

module.exports = UserController;