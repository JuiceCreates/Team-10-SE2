const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserDAO {
    async createUser(email, pwHash, firstName, lastName) {
        return await prisma.user.create({
            data: {
                email: email,
                password: pwHash,
                firstName: firstName,
                lastName: lastName
            }
        });
    }

    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
}

module.exports = UserDAO;