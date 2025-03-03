const express = require('express');
const router = express.Router();

const DashboardController = (dashboardService) => {
    router.get('/dashboard', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        res.render('dashboard');
    });
    module.exports = router;

    return router;
};

module.exports = DashboardController;