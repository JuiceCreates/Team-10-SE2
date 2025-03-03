const express = require('express');
const router = express.Router();

const UserController = (UserService) => {
    router.post('/register', async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        //We could have just avoided doing this but we already have tests.
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!firstName) missingFields.push('firstName');
        if (!lastName) missingFields.push('lastName');

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                missingFields: missingFields,
                message: `You are missing: ${missingFields.join(', ')}` 
            });
        }
        try {
            const userData = { email, password, firstName, lastName };
            const newUser = await UserService.registerUser(userData);
            res.status(201).json({ 
                message: 'User registered successfully', 
                userId: newUser.id 
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Error registering user', message: error.message });
        }
    });

    return router;
};

module.exports = UserController;