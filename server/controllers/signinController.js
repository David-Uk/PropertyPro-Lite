import bcrypt from 'bcryptjs';
import middleware from '../middleware/middleware';
import { users } from '../models/models';

exports.signin = (req, res) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            error: 'Email and Password are required !',
        });
    }

    const returnUser = user => bcrypt.compareSync(password, user.password) && user.email === email;
    const userObject = users.find(returnUser);

    if (!userObject) {
        return res.status(401).json({
            status: 'error',
            error: 'Wrong email or password',
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            token: middleware.token(userObject.id),
            id: userObject.id,
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            email: userObject.email,
        },
    });
};
