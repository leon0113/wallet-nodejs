const express = require('express');
const { userSignUp, userSignIn, userUpdate } = require('../service/user');
const { authMiddleware } = require('../middleware/authMiddleware');

const userRouter = express.Router();

//todo: TEST ROUTE
userRouter.get('/test', authMiddleware, (req, res) => {
    return res.json({ msg: "hit" })
});

userRouter.post('/signup', userSignUp);
userRouter.post('/signin', userSignIn);
userRouter.put('/updateUser', authMiddleware, userUpdate)



module.exports = userRouter
