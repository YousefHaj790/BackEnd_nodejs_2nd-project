const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Something went wrong.. Try again!" })
    }
}

module.exports = authMiddleware;