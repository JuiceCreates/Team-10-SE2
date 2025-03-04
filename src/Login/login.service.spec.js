const LoginService = require('./login.service');

describe('LoginService', () => {
  let loginService;
  let mockUserDAO;
  let mockBcrypt;
  let mockUser;

  beforeEach(() => {
    mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'Test',
      lastName: 'User'
    };

    mockUserDAO = {
      findUserByEmail: jest.fn()
    };

    mockBcrypt = {
      compare: jest.fn()
    };

    loginService = new LoginService(mockUserDAO, mockBcrypt);
  });

  describe('authenticateUser', () => {
    it('should return user when credentials are valid', async () => {
      mockUserDAO.findUserByEmail.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(true);

      const result = await loginService.authenticateUser('test@example.com', 'correctPassword');

      expect(mockUserDAO.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockBcrypt.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword');
      expect(result).toEqual(mockUser);
    });

    it('should return null when user is not found', async () => {
      mockUserDAO.findUserByEmail.mockResolvedValue(null);

      const result = await loginService.authenticateUser('nonexistent@example.com', 'anyPassword');

      expect(mockUserDAO.findUserByEmail).toHaveBeenCalledWith('nonexistent@example.com');
      expect(mockBcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      mockUserDAO.findUserByEmail.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(false);

      const result = await loginService.authenticateUser('test@example.com', 'wrongPassword');

      expect(mockUserDAO.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockBcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(result).toBeNull();
    });
  });
});