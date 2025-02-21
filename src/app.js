
const express = require('express');
const session = require('express-session');
const app = express(); 

// Set up session middleware
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: { secure: false },
}));


// Set up Handlebars middleware
const HandlebarsMiddleware = require('./middleware/handlebars.middleware'); 
HandlebarsMiddleware.setup(app);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send("Resource not found");
});

module.exports = app;