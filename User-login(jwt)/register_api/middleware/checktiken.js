// auth.js
const jwt = require('jsonwebtoken');
const secret_key = "1234567812345678123456781234567812345678";

exports.check = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Access token is missing',
            });
        }

        jwt.verify(token, secret_key, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        status: 'error',
                        message: 'Access token has expired. Please refresh your token.',
                    });
                } else {
                    return res.status(401).json({
                        status: 'error',
                        message: 'Invalid access token',
                    });
                }
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
