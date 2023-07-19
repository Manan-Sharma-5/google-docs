const jwt = require('jsonwebtoken');

const Authenticator = (req, res, next) => {
    const token = req.header('Authorization');

    try {
        if (!token) {
            return res.status(401).json({
                status: 'No Token Sent'
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                status: 'Invalid Token'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            status: 'Invalid Token'
        });
    }
};

module.exports = Authenticator;
