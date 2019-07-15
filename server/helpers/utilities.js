import { users, adverts } from '../models/models';

exports.datetime = new Date();

exports.currentUser = (id) => {
    let userData = null;
    users.forEach((user) => {
        if (user.id === id) {
            userData = user;
        }
    });
    return userData;
};

// Restrict access to only agent/admin
exports.checkUserType = (userData, res) => {
    if (userData) {
        if (userData.is_admin === false) {
            return res.status(401).json({
                status: "error",
                error: 'Access denied!',
            });
        }
    } else {
        // User does not exist. Deleted when list was cleared
        return res.status(401).json({
            status: "error",
            error: 'Expired token. Please login!',
        });
    }
};

// return an object of a provided advertId
exports.checkAdvert = (advertId) => {
    for (let i = 0; i < adverts.length; i++) {
        if (adverts[i].id === Number(advertId)) {
            return adverts[i];
        }
    }
};

// check loggedin user
exports.loggedinUser = (userObj, res) => {
    if (!userObj) {
        return res.status(401).json({
            status: "error",
            error: 'Token expired. Please login again!',
        });
    }
};

// check for a specifc property advert
exports.checkAdvertId = (advertObj, id, res) => {
    if (!advertObj) {
        return res.status(400).json({
            status: "error",
            error: `There is no property with Id: ${id}`,
        });
    }
};
