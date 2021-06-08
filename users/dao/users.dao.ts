import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import shortid from "shortid";
import debug, { Debug } from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UserDao {
    users: Array<CreateUserDto> = [];

    constructor() {
        log("A new instance of UserDoa as been created");
    }

    // add a new user
    async addUser(user: CreateUserDto) {
        user.id = shortid.generate();
        this.users.push(user);
        return user.id;
    }

    // get all the users
    async getUsers() {
        return this.users;
    }

    // get one user by it id
    async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId);
    }

    // update the user
    async putUserById(userId: string, user: PutUserDto) {
        const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
        this.users.splice(objIndex, 1, user);
        return `${user.id} updated using put`
    }

    async patchUserById(userId: string, user: PatchUserDto) {
        const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === user.id)
        let currentUser = this.users[objIndex];
        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel',
        ];
        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                currentUser[userId] = user[field]
            }
        }

        this.users.splice(objIndex, 1, currentUser)
        return `${user.id} got updated using patch`
    }

    async deleteUserById(userId: string) {
        const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex((obj: { email: string }) => obj.email === email);
        let currentUser = this.users[objIndex];
        return currentUser ? currentUser : null

    }
}

export default new UserDao();