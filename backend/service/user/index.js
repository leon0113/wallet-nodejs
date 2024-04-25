const z = require("zod");
const { User, Account } = require("../../db");
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
        await Account.create({
            userId,
            balance: Math.ceil(1 + Math.random() * 10000)
        })
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

    const { success } = updateUserBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        const u = await User.findOneAndUpdate({ _id: req.userId }, {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, {
            new: true
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

//! =============== filter user ==================

const bulkUser = async (req, res) => {
    // retrive query parameter from the url
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            },
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    const filteredUsers = users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
    }));

    res.json({
        user: filteredUsers
    })
}


module.exports = {
    userSignUp,
    userSignIn,
    userUpdate,
    bulkUser
}