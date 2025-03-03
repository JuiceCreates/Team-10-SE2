
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: { secure: false },
}));

app.use(express.static(path.join(__dirname, '../public')));

// Set up Handlebars middleware
const HandlebarsMiddleware = require('./middleware/handlebars.middleware'); 
HandlebarsMiddleware.setup(app);


const LoginController = require('./Controllers/login.controller');
const UserController = require('./Controllers/user.controller');
const DashboardController = require('./Controllers/dashboard.controller');

const LoginService = require('./Services/login.service');
const UserService = require('./Services/user.service');
const DashboardService = require('./Services/dashboard.service');

app.use('/', LoginController(new LoginService()));
app.use(UserController(new UserService()));
app.use(DashboardController(new DashboardService()));


app.get('/' , (req, res) =>{
    res.redirect('/login');
});


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