import { Request, Response } from "express";
import { ERROR_TYPES } from "../error";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../validators/user.validator";
import { createUser, deleteUser, getUsers, updateUser } from "../services/user.service";
import { SUCCESS_TYPES } from "../success";
import { User } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await createUser(req.body);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, user: result.newUser });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const getUsersController = async (_: Request, res: Response) => {
    try {
        const result = await getUsers();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await updateUser(req.body);
        return res.status(200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, user: result.updatedUser });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const { error } = deleteUserSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await deleteUser(req.body);
        return res.status(200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, user: result.deletedUser });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    console.log('-------------------------------------------------')
    const { identifier, password } = req.body;
    console.log({ identifier, password });

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

   const user = await User.findOne({ email: identifier });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user,
    });
};