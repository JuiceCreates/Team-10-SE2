class LoginService{
    constructor(userDAO, bcrypt) {
      this.userDAO = userDAO;
      this.bcrypt = bcrypt;
    }

  async authenticateUser(email, password) {
      console.log('Authenticating user:', email);
      const user = await this.userDAO.findUserByEmail(email);

      if (user && await this.bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
  }
}

module.exports = LoginService;
