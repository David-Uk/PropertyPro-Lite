import express from 'express';
import { allUsers, signup } from '../controllers/usersController';
import { middleware } from '../middleware/middleware';

const router = express.Router();

router.route('/auth/signup').post(signup);
router.route('/auth/signup').get(allUsers);

export default router;