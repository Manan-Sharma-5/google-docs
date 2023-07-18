const jwt = require('jsonwebtoken');

const Authenticator = (req, res, next) => {
    const token = req.cookies.token;
    try {

        if (!token) {
            res.status(401).json({
                status: 'No Token Sent'
            });
            const check = jwt.verify(token, process.env.JWT_SECRET);
            if (!check) {
                res.status(401).json({
                    status: 'Invalid Token'
                });
            }
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            status: 'Invalid Token'
        });
    }
};

module.exports = Authenticator;