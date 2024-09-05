import { UserModel } from "./schema.js";

const handleError = (error, operation) => {
    console.error(`Error in ${operation}:`, error);
    throw error;
};

export const getUsers = async () => {
    try {
        console.log("Fetching all users");
        return await UserModel.find();
    } catch (error) {
        handleError(error, "getUsers");
    }
};

export const createUser = async (_, { name, email, address }) => {
    try {
        console.log("Creating new user:", { name, email, address });
        const newUser = new UserModel({ name, email, address });
        return await newUser.save();
    } catch (error) {
        handleError(error, "createUser");
    }
};

export const findUserById = async (_, { id }) => {
    try {
        console.log("Finding user by ID:", id);
        const user = await UserModel.findById(id);
        if (!user) {
            console.log(`User not found with ID: ${id}`);
            return null;
        }
        return user;
    } catch (error) {
        handleError(error, "findUserById");
    }
};

export const updateUser = async (_, { id, name, email, address }) => {
    try {
        console.log("Updating user:", { id, name, email, address });
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, address },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            console.log(`User not found with ID: ${id}`);
            return null;
        }
        return updatedUser;
    } catch (error) {
        handleError(error, "updateUser");
    }
};

export const deleteUser = async (_, { id }) => {
    try {
        console.log("Deleting user with ID:", id);
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            console.log(`User not found with ID: ${id}`);
            return false;
        }
        return true;
    } catch (error) {
        handleError(error, "deleteUser");
    }
};