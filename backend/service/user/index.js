const z = require("zod");
const User = require("../../db");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

const SignupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
})

const userSignUp = async (req, res) => {
    const { success } = SignupBody.safeParse(req.body);
    console.log(success);
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
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        })
    }

}


module.exports = {
    userSignUp
}