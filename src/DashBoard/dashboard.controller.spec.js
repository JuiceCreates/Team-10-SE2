const request = require('supertest');
const express = require('express');
const session = require('express-session');
const DashboardController = require('./dashboard.controller');
const DashboardService = require('./dashboard.service');

let app;
let dashboardService;

beforeEach(() => {
    dashboardService = new DashboardService();
    app = express();
    app.use(express.json());

    app.use(session({
        secret: 'test_secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));

    app.use(DashboardController(dashboardService));
});

describe("Unauthorized Access", () => {
    beforeEach(() => {
        app = express();
        app.use(express.json());


        app.use((req, res, next) => {
            req.session = null;
            next();
        });

        app.use(DashboardController(dashboardService));
    });

    it("should return 302 for any route if not authenticated", async () => {
        const response = await request(app).get("/dashboard");
        expect(response.status).toBe(302);
    });
});



describe("Authorized Access", () => {
    beforeEach(() => {
        app.use((req, res, next) => {
            req.user = { id: 1, email: 'goodEmail@goodEmail.com' }; // Mocking a logged-in user
            next();
        });
    });

    it("should allow access to protected routes", async () => {
        const response = await request(app).get("/some-protected-route");
        expect(response.status).not.toBe(401);
    });
});
