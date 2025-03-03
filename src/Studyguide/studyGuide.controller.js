const express = require('express');
const router = express.Router();

const StudyguideController = (studyguideService) => {
    router.get('/studyGuides', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        res.render('studyGuides');
    });

    module.exports = router;

    return router;
};

module.exports = StudyguideController;