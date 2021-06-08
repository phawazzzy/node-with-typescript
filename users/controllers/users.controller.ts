import express from "express";

import UserService from "../services/users.service";

import debug from "debug";
import argon2 from "argon2";
import usersService from "../services/users.service";

const log: debug.IDebugger = debug("app:users-controller")

class UsersController {
    async listAllUser(req: express.Request, res: express.Response) {
        const users = await UserService.list(100, 0);
        return res.status(200).send(users);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const user = await UserService.create(req.body);
        return res.status(201).send(user);
    }

    async getOneUser(req: express.Request, res: express.Response) {
        const user = await UserService.readById(req.body.id)
        return res.status(200).send(user);
    }

    async deleteUser(req: express.Request, res: express.Response) {
        const result = await usersService.deleteById(req.body.id);
        return res.status(204).send(result);
    }

    async updateUserDetails(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const result = await usersService.putById(req.body.id, req.body);
        return res.status(204).send(result);
    }

    async getUserByEmail(req: express.Request, res: express.Response) {
        const user = await usersService.getUserByEmail(req.body.email);
        return res.status(200).send(user);
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }
}

export default new UsersController();
