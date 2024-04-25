const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getBalance } = require("../service/account");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalance);


module.exports = accountRouter;