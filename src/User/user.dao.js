class UserDAO{
    constructor(prisma){
        this.prisma = prisma;
    }

    async createUser(userData){
        return this.prisma.user.create({
            data: userData
        });
    }

    async findUserByEmail(email){
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
}

module.exports = UserDAO;