const express = require('express');

module.exports = (loginService) => {
    const router = express.Router();

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', async (req, res) => {
        try {
            const user = await loginService.authenticateUser(String(req.body.email), String(req.body.password));
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            else {
                req.session.user = { id: user.id, email: user.email };
                res.redirect('/dashboard');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });

    router.post('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    });

    return router;
};

