const express = require('express');
const { userSignUp } = require('../service/user');

const userRouter = express.Router();

userRouter.post('/signup', userSignUp);



module.exports = userRouter
