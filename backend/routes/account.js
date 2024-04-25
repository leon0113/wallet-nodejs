const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getBalance, transferMoney } = require("../service/account");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalance);
accountRouter.post("/transfer", authMiddleware, transferMoney);


module.exports = accountRouter;