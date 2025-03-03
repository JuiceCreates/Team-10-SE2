const express = require('express');
const router = express.Router();

const DashboardController = (dashboardService) => {
    router.get('/dashboard', (req, res) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }
        res.render('dashboard');
    });

    router.get('/studyGuides', (req, res) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }
        res.render('studyGuides');
    });

    return router;
};

module.exports = DashboardController;
