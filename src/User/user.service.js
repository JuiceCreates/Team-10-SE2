class UserService {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }

    async registerUser(userData) {
        try {
            console.log('Creating user with data:', userData);
                return await this.userDAO.createUser(userData);
          } catch (error) {
                console.error('Error creating user:', error);
                throw error;
          }
        }
    }

module.exports = UserService;