import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse.js';
import { UserServices } from './user.service.js';
import { User } from './user.model.js';

// name: '',
// age: '',
// gender: '',
// phone: '',
// email: '',
// password: '',
// address: '',
// dutyTime: '',
// role: '',

//////////////// CREATE USER //////////////
const createUser = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error('Request body is required');
    }

    const result = await UserServices.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to create user',
      data: null,
    });
  }
};

//////////////// GET ALL USERS //////////////
const getAllUsers = async (req, res) => {
  try {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to retrieve users',
      data: null,
    });
  }
};

//////////////// UPDATE USER //////////////
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      throw new Error('Unauthorized access. Please log in.');
    }

    // First find the user to get their role
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if user is manager or updating their own profile
    const isManager = req.user.role === 'manager';
    if (!isManager && id !== req.user._id.toString()) {
      throw new Error('You can only update your own profile');
    }

    // If not manager, remove role and dutyTime from updatedData
    if (!isManager) {
      delete updatedData.role;
      delete updatedData.dutyTime;
    }

    const result = await UserServices.updateUser(id, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to update user',
      data: null,
    });
  }
};

//////////////// DELETE USER //////////////
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // First find the requesting user to check if they're manager
    if (!req.user || !req.user._id) {
      throw new Error('Unauthorized access. Please log in.');
    }

    const adminUser = await User.findById(req.user._id);
    if (!adminUser || adminUser.role !== 'manager') {
      throw new Error('Only manager can delete users');
    }

    const result = await UserServices.deleteUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Failed to delete user',
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const result = await UserServices.loginUser(email, password);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message || 'Login failed',
      data: null,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
