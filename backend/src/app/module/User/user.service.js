import { User } from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';

// name,
// age,
// gender,
// phone,
// email,
// password,
// address,
// dutyTime,
// role,

//////////////// CREATE USER //////////////
const createUser = async (userData) => {
  try {
    // Validate userData
    if (!userData) {
      throw new Error('User data is required');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create user with hashed password
    const result = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to create user');
  }
};

//////////////// GET ALL USERS //////////////
const getAllUsers = async () => {
  try {
    const result = await User.find({});
    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to retrieve users');
  }
};

//////////////// UPDATE USER //////////////
const updateUser = async (id, updatedData) => {
  try {
    // First find the user to get their role
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Remove protected fields that shouldn't be updated
    const protectedFields = ['email', '_id', 'name', 'gender'];

    // Remove protected fields from updatedData
    protectedFields.forEach((field) => {
      delete updatedData[field];
    });

    // If there's no data to update after removing protected fields
    if (Object.keys(updatedData).length === 0) {
      throw new Error('No valid fields to update');
    }

    // If password is being updated, hash it
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(updatedData.password, salt);
    }

    const result = await User.findByIdAndUpdate(
      id,
      { ...updatedData },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to update user');
  }
};

const deleteUser = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete user');
  }
};

//////////////// GENERATE TOKEN //////////////
const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
};

//////////////// LOGIN USER //////////////
const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate token
    const token = generateToken(user._id);

    return {
      user,
      token,
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const UserServices = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
