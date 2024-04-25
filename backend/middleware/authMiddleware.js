const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../db");


const authMiddleware = async (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Not Authorized"
        })
    };

    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const authenticateUser = await User.findOne({
            _id: userId
        });

        if (authenticateUser) {
            next();
        } else {
            return res.status(403).json({
                message: "Wrong User"
            })
        }
    } catch (error) {
        return res.status(403).json({
            message: "Unverfied token"
        });
    }
}

module.exports = {
    authMiddleware
}