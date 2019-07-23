import express from 'express';
import * as userDao from '../daos/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';

export const usersRouter = express.Router();

/**
 * /users
 * find all users
 */
usersRouter.get('', [
    authMiddleware('admin', 'finance-manager'),
    async (req, res) => {
        const users = await userDao.findAll();
        res.json(users);
    }]);

/**
 * /users/:id
 * find user by id
 */
usersRouter.get('/:id', [
    authMiddleware('admin', 'finance-manager'),
    async (req, res) => {
        let id = req.params.id;
        const user = await userDao.findById(id);
        res.json(user);
    }]);

/**
 * /users
 * update user based off fields provided
 */
usersRouter.patch('', [
    authMiddleware('admin'),
    async (req, res) => {
        let input = req.body;
        let updatedUser = await userDao.updateUser(input);
        res.json(updatedUser);
    }]);

// CREATE MORE AS EXTRA BUT NOT NECESSARY