const express = require('express');
const router = express.Router();

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