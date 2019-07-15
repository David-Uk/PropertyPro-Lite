import bcrypt from 'bcryptjs';
import middleware from '../middleware/middleware';
import { users } from '../models/models';
import { checkName, checkEmail, checkPassword, checkPhoneNumber, checkEmptyFields } from '../helpers/validators';

exports.signup = (req, res) => {
    const {
        email, firstName, lastName, password, phoneNumber, address, isAdmin,
    } = req.body;

    if (checkEmptyFields(email, password, lastName, firstName, phoneNumber, res)) {
        return checkEmptyFields(email, password, lastName, firstName, phoneNumber, res);
    }

    const firstN = firstName.trim();
    const lastN = lastName.trim();
    const elMail = email.trim();
    const phoneN = phoneNumber.trim();
    const addre = address.trim();
    const admin = isAdmin;


    if (checkName(firstN, lastN, res)) {
        return checkName(firstN, lastN, res);
    }

    
    if (checkEmail(elMail, res)) {
        return checkEmail(email, res);
    }

    // Validate password
    if (checkPassword(password, res)) {
        return checkPassword(password, res);
    }

    if (checkPhoneNumber(phoneN, res)) {
        return checkPassword(phoneN, res);
    }

    // generate user id basing on list length
    const userId = users.length + 1;

    // hashpassword
    const hashedPassword = bcrypt.hashSync(password, 8);

    // capture data
    const data = {
        id: userId,
        email: elMail,
        firstName: firstN,
        lastName: lastN,
        password: hashedPassword,
        phoneNumber: phoneN,
        address: addre,
        is_admin: admin,

    };

    const doesEmailAlreadyExist = users.some(user => user.email === data.email);
    if (doesEmailAlreadyExist) {
        return res.status(400).json({
            status: "error",
            error: 'Email already exists, try another',
        });
    }
    users.push(data);

    // return the JWT token for the future API calls
    return res.status(200).json({
        status: "success",
        data: {
            token: middleware.token(data.id),
            id: data.id,
            firstName: data.firstName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            is_admin: data.is_admin,
        },
    });
};

exports.allUsers = (req, res) => res.status(200).json({
    status: "success",
    data: users,
});
