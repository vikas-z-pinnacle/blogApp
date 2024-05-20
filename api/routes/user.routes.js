import express from 'express';
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:id', getUser);

export default router;
