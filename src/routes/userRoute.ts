import { Router } from 'express';
import { getAllUsers, loginUser, registerUser } from '../controller/userController';

const router = Router();

router
    .get('/users', getAllUsers)
    .post('/signin', loginUser)
    .post('/signup', registerUser)

export default router;