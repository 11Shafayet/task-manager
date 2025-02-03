import jwt from 'jsonwebtoken';
import { User } from '../module/User/user.model.js';
import config from '../../config/index.js';

const auth = async (req, res, next) => {
  try {
    // Get authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
        data: null,
      });
    }

    // Check if token format is correct
    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format',
        data: null,
      });
    }

    // Get the token without 'Bearer '
    const accessToken = token.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(accessToken, config.jwt.secret);

    if (!decoded._id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        data: null,
      });
    }

    // Find user with decoded id
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed',
      data: null,
    });
  }
};

export { auth };
