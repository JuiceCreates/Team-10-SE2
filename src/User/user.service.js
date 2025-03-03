const bcrypt = require('bcrypt');

class UserService {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }

    async registerUser(userData) {
        try {
            console.log('Creating user with data:', userData);
            const existingUser = await this.userDAO.findUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already exists');
            }
            userData.password = await bcrypt.hash(userData.password, 10);
            return await this.userDAO.createUser(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
          }
        }
    }

module.exports = UserService;