const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const LoginController = (loginService) => {

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req,res) =>{
    res.render('register');
});


module.exports = router;


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await loginService.authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.user = { id: user.id, email: user.email };
        res.redirect('/dashboard');
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
module.exports = LoginController;
