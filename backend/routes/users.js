import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  setNewAvatar,
  updateProfile,
  getMe,
} from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import {
  validateUserAvatar, validateCreateUser, validateEditUser, validateGetUserById,
} from '../validation/users.js';

const routerUser = Router();

routerUser.get('/', auth, getUsers);
routerUser.get('/me', auth, getMe);
routerUser.get('/:userId', validateGetUserById, auth, getUserById);
routerUser.post('/', validateCreateUser, auth, createUser);
routerUser.patch('/me', validateEditUser, auth, updateProfile);
routerUser.patch('/me/avatar', validateUserAvatar, auth, setNewAvatar);

export default routerUser;
