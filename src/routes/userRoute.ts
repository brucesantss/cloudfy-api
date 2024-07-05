import { Router } from 'express';
import { getAllUsers, registerUser } from '../controller/userController';

const router = Router();

router
    .get('/users', getAllUsers)
    .post('/signup', registerUser)

export default router;