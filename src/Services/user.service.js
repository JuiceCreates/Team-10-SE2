const bcrypt = require('bcrypt');
const UserDAO = require('../DAOs/user.dao');

class UserService {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async registerUser(email, password, firstname, lastname) {
        try {
            const existingUser = await this.userDAO.findUserByEmail(email);

            if (existingUser) {
                return null;
            }
            else {
                console.log('Creating user with data');
                const pwHash = await bcrypt.hash(password, 10);
                const newUser = await this.userDAO.createUser(email, pwHash, firstname, lastname);
                return newUser;
            }
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
          }
        }
    }

module.exports = UserService;