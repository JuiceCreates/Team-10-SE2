const bcrypt = require('bcrypt');
const UserDAO = require('../DAOs/user.dao');

class LoginService{
    constructor() {
      this.UserDAO = new UserDAO();
    }

  async authenticateUser(email, password) {
      console.log('Authenticating user:', email);
      const user = await this.UserDAO.findUserByEmail(email);
      if (!user) {
        return null;
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        return user;
      }
      return null;
  }
}

module.exports = LoginService;
