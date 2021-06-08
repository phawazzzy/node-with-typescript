import { CRUD } from "../../common/interfaces/crud.interface";
import UsersDao from "../dao/users.dao";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

class UserService implements CRUD {
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return UsersDao.deleteUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersDao.putUserById(id, resource);
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersDao.patchUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }
}

export default new UserService();