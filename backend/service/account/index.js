const { Account } = require("../../db");

const getBalance = async (req, res) => {
    const userId = req.userId;

    const account = await Account.findOne({
        userId: userId
    })

    res.json({
        balance: account.balance
    })
}

module.exports = {
    getBalance
}