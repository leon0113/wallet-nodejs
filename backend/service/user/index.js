const z = require("zod");
const User = require("../../db");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

//! =============== signUp ==================
const SignupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
})

const userSignUp = async (req, res) => {
    const { success } = SignupBody.safeParse(req.body);
    // console.log(success);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect credentials"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "User already exist with this user name"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    if (user) {
        const userId = user._id;
        // console.log(userId);
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        })
    }

}

//! =============== signIn ==================
const SignInBody = z.object({
    username: z.string(),
    password: z.string(),
})

const userSignIn = async (req, res) => {
    const { success } = SignInBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect credentials"
        });
    };

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        // console.log(token);
        return res.json({
            message: 'Logged in successfully',
            token: token,
        })
    } else {
        return res.status(411).json({
            message: "Incorrect credentials"
        })
    }
}

//! =============== update user info ==================

const updateUserBody = z.object({
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
})

const userUpdate = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { success } = updateUserBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        console.log(userId);

        const u = await User.findOneAndUpdate({ _id: userId }, {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, {
            new: true //return the updated document
        });
        console.log(u);
        res.json({
            message: "Updated successfully"
        });
    } catch (err) {
        // Handle JWT verification error
        console.error("JWT verification error:", err);
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};




module.exports = {
    userSignUp,
    userSignIn,
    userUpdate
}