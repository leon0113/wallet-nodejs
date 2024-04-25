const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");


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
    // console.log(token);
    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded);
        const userId = decoded.userId;
        // console.log(userId);
        const authenticateUser = await User.findOne({
            _id: userId
        });
        // console.log(authenticateUser);
        if (authenticateUser) {
            req.userId = authenticateUser._id;
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