const bcrypt = require('bcrypt');

class UserService {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }

    async registerUser(userData) {
        try {
            console.log('Creating user with data:', userData);
            userData.password = await bcrypt.hash(userData.password, 10);
            return await this.userDAO.createUser(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
          }
        }
    }

module.exports = UserService;