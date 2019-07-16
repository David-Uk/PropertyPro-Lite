
exports.checkEmptyFields = (em, pass, lname, fname, phno, res) => {
    if (!em || !pass || !lname || !fname || !phno) {
        return res.status(400).json({
            status: "error",
            error: 'Email, Password, firstName, lastName and phoneNumber are required !',
        });
    }
};

exports.checkAdEmptyFileds = (status, type, state, city, address, price, imageUrl, res) => {
    if (!status || !type || !state || !city || !address || !price || !imageUrl) {
        return res.status(400).json({
            status: "error",
            error: 'status, type, state, city, address, price and imageUrl are required !',
        });
    }
};

exports.checkName = (fname, lname, res) => {
    if (!fname.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) || !lname.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/)) {
        return res.status(400).json({
            status: "error",
            error: 'Names should not contain special characters',
        });
    }
};

exports.checkEmail = (email, res) => {
    // Validate email
    if (!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)) {
        return res.status(400).json({
            status: "error",
            error: 'Invalid email format ',
        });
    }
};

exports.checkPassword = (password, res) => {
    if (!password.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
        return res.status(400).json({
            status: "error",
            error: 'Weak password, must be at least 8 characters and have at least 1 letter and number',
        });
    }
};

exports.checkPhoneNumber = (phoneNumber, res) => {
    if (!phoneNumber.match(/^[0]\d{10}$/)) {
        return res.status(400).json({
            status: "error",
            error: 'Please enter a valid phone number',
        });
    }
};
