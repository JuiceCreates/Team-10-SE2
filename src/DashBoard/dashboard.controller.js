const express = require('express');
const bcrypt = require('bcrypt');
const router = express.router();

const DashboardController = (dashboardService) =>{
    router.get('/dashboard', (req,res) =>{
        res.render('dashboard');
    });
    router.get('/studyGuides',(req,res) =>{
        res.render('studyGuides');
    });
    
    module.exports = router;

    return router;
};

module.exports = DashboardController;