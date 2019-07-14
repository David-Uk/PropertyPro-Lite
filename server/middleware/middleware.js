import jwt from 'jsonwebtoken';
import secret from '../config/config';


exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
        return res.status(401).json({ status: "error", message: 'No token provided.' });
    }

    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "error", message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        next();
    });
};

// Generate auth token
// eslint-disable-next-line arrow-parens
exports.token = id => {
    const token = jwt.sign({ id }, secret.secret, { expiresIn: '24h' });

    return token;
};
