const request = require('supertest');
const express = require('express');
const LoginController = require('./login.controller');

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true)
}));

describe('LoginController', () => {
    let app;
    let mockSession;

    beforeEach(() => {
        jest.clearAllMocks();
        app = express();
        app.use(express.json());
        
        mockSession = { 
            user: {},
            destroy: jest.fn(cb => cb()) 
        };
        
        // Create a loginService with authenticateUser method
        const loginService = {
            authenticateUser: jest.fn().mockImplementation(async (email, password) => {
                if (email === 'test@example.com' && password === 'password123') {
                    return { id: 1, email: 'test@example.com' };
                }
                return null;
            })
        };
        
        // Add session mock to requests
        app.use((req, res, next) => {
            req.session = mockSession;
            next();
        });

        // Mock render and redirect methods
        app.use((req, res, next) => {
            res.render = jest.fn().mockImplementation(() => res.sendStatus(200));
            const originalRedirect = res.redirect;
            res.redirect = jest.fn().mockImplementation((path) => {
                res.statusCode = 302;
                res.setHeader('Location', path);
                return res.end();
            });
            next();
        });
        
        // Apply the login controller
        app.use(LoginController(loginService));
    });

    describe('GET /login', () => {
        it('should render the login page', async () => {
            const response = await request(app).get('/login');
            expect(response.status).toBe(200);
        });
    });
    
    describe('GET /register', () => {
        it('should render the register page', async () => {
            const response = await request(app).get('/register');
            expect(response.status).toBe(200);
        });
    });
    
    describe('POST /login', () => {
        it('should return 400 if password is missing', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com' });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Email and password are required' });
        });

        it('should return 400 if email is missing', async () => {
            const response = await request(app)
                .post('/login')
                .send({ password: 'password123' });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Email and password are required' });
        });

        it('should return 400 if both email and password are missing', async () => {
            const response = await request(app)
                .post('/login')
                .send({});
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Email and password are required' });
        });
        
        it('should authenticate user and redirect to dashboard on success', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password123' });
                
            expect(response.status).toBe(302);
            expect(response.headers.location).toBe('/dashboard');
            expect(mockSession.user).toEqual({ id: 1, email: 'test@example.com' });
        });
        
        it('should return 401 if credentials are invalid', async () => {
            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' });
                
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'Invalid credentials' });
        });
    });
    
    describe('POST /logout', () => {
        it('should destroy session and redirect to login page', async () => {
            const response = await request(app).post('/logout');
            
            expect(mockSession.destroy).toHaveBeenCalled();
            expect(response.status).toBe(302);
            expect(response.headers.location).toBe('/login');
        });
    });
});