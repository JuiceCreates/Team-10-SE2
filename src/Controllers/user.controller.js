const express = require('express');
const router = express.Router();

const UserController = (UserService) => {

    router.get('/register', (req,res) =>{
        res.render('register');
    });
    
    router.post('/register', async (req, res) => {
        
        try {
            const user = await UserService.registerUser(
                                    String(req.body.email),
                                    String(req.body.password),
                                    String(req.body.firstName),
                                    String(req.body.lastName)
                            );

            if (!user) {
                res.status(403).json({
                    error: 'User Creation Error',
                    message: 'Could not create new user.'
                })
            }
            else {
                res.status(201).json({ 
                    message: 'User registered successfully', 
                    userId: user.id 
                });
            }
        } catch (error) {            
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