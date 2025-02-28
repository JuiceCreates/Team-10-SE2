
const express = require('express');
const session = require('express-session');
const bcrypt = require("bcrypt");
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDAO = require('./User/user.dao');


const LoginService = require('./Login/login.service');
const UserService = require('./User/user.service');
const DashboardService = require('./DashBoard/dashboard.service');



const userDAO = new UserDAO(prisma);
const loginService = new LoginService(userDAO);
const userService = new UserService(userDAO, bcrypt);
const dashboardService = new DashboardService();

const loginController = require('./Login/login.controller');
const UserController = require('./User/user.controller');
const DashboardController = require('./DashBoard/dashboard.controller');

app.use(DashboardController(dashboardService));
app.use(UserController(userService));
app.use(loginController(loginService));
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