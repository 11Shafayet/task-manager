import express from 'express';
import { UserControllers } from './user.controller.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.patch('/:id', auth, UserControllers.updateUser);
router.delete('/:id', auth, UserControllers.deleteUser);
router.post('/login', UserControllers.loginUser);

export const UserRoutes = router;
