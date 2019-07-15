import express from 'express';
import { allUsers, signup } from '../controllers/usersController';
import { signin } from '../controllers/signinController';
import { createAdvert, allAdverts } from '../controllers/postadvert';
import { deleteAdvert } from '../controllers/deleteadvert';
import { updateAdvert } from '../controllers/updateadvert';
import { singleAdvert } from '../controllers/singleadvert';
import { verifyToken, token } from '../middleware/middleware';

const router = express.Router();

router.route('/auth/signup').post(signup);
router.route('/auth/signup').get(allUsers);
router.route('/auth/signin').post(signin);
router.route('/property').post(verifyToken, createAdvert);
router.route('/property').get(allAdverts);
router.route('/property/:propertyId')
    .delete(verifyToken, deleteAdvert)
    .patch(verifyToken, updateAdvert)
    .get(singleAdvert);

export default router;