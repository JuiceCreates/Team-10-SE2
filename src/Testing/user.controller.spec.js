const request = require('supertest');
const express = require('express');
const UserController = require('./user.controller');

let app;
let userServiceMock;

function initializeApp() {
    app = express();
    app.use(express.json());
    app.use(UserController(userServiceMock));
}

beforeEach(() => {
    userServiceMock = {
        registerUser: jest.fn()
    };
    initializeApp();
});

describe('UserController', () => {
    describe('POST /register', () => {
        it('should register a user successfully', async () => {
            const mockUser = { 
                id: 1,
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe'
            };
            
            userServiceMock.registerUser.mockResolvedValue(mockUser);
            
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    firstName: 'John',
                    lastName: 'Doe'
                });
                
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'User registered successfully',
                userId: 1
            });
            
            expect(userServiceMock.registerUser).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe'
            });
        });
        
        it('should return 400 if all required fields are missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({});
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['email', 'password', 'firstName', 'lastName'],
                message: 'You are missing: email, password, firstName, lastName'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
        
        it('should return 400 if email is missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    password: 'password123',
                    firstName: 'John',
                    lastName: 'Doe'
                });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['email'],
                message: 'You are missing: email'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
        
        it('should return 400 if password is missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    firstName: 'John',
                    lastName: 'Doe'
                });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['password'],
                message: 'You are missing: password'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
        
        it('should return 400 if firstName is missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    lastName: 'Doe'
                });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['firstName'],
                message: 'You are missing: firstName'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
        
        it('should return 400 if lastName is missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    firstName: 'John'
                });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['lastName'],
                message: 'You are missing: lastName'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
        
        it('should return 400 if multiple fields are missing', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com'
                });
                
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Missing required fields',
                missingFields: ['password', 'firstName', 'lastName'],
                message: 'You are missing: password, firstName, lastName'
            });
            
            expect(userServiceMock.registerUser).not.toHaveBeenCalled();
        });
    });
});
    // Need to figure out 409/500 server error for full coverage