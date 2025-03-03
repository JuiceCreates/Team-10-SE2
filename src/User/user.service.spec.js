const UserService = require('./user.service');

describe('UserService', () => {
  let userService;
  let mockUserDAO;
  
  beforeEach(() => {
    mockUserDAO = {
      createUser: jest.fn(),
      findUserByEmail: jest.fn() // Mocking findUserByEmail
    };
    
    userService = new UserService(mockUserDAO);
    
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should create a user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const createdUser = {
        id: 1,
        ...userData,
        password: 'hashed_password'
      };
      
      mockUserDAO.createUser.mockResolvedValue(createdUser);
      
      const result = await userService.registerUser(userData);
      
      expect(result).toEqual(createdUser);
      expect(mockUserDAO.createUser).toHaveBeenCalledWith(userData);
      expect(console.log).toHaveBeenCalledWith('Creating user with data:', userData);
    });

    it('should throw an error if email already exists', async () => {
      const userData = {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe'
      };
  
      mockUserDAO.findUserByEmail.mockResolvedValue({ id: 1, ...userData }); // Simulate existing user
  
      await expect(userService.registerUser(userData)).rejects.toThrow('Email already exists');
  
      expect(mockUserDAO.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserDAO.createUser).not.toHaveBeenCalled();
  });
  

    it('should throw an error if user creation fails', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };
      
      const error = new Error('Database error');
      mockUserDAO.createUser.mockRejectedValue(error);
      
      await expect(userService.registerUser(userData)).rejects.toThrow('Database error');
      expect(mockUserDAO.createUser).toHaveBeenCalledWith(userData);
      expect(console.error).toHaveBeenCalledWith('Error creating user:', error);
    });

    it('should handle unique constraint violation', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };
      
      const prismaError = new Error('Unique constraint failed on the fields: (`email`)');
      prismaError.code = 'P2002';
      prismaError.meta = { target: ['email'] };
      
      mockUserDAO.createUser.mockRejectedValue(prismaError);
      
      await expect(userService.registerUser(userData)).rejects.toThrow(prismaError);
      expect(mockUserDAO.createUser).toHaveBeenCalledWith(userData);
      expect(console.error).toHaveBeenCalledWith('Error creating user:', prismaError);
    });
  });
});