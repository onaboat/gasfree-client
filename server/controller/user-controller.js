const User = require('../model/user-model')


const addUser = async (req, res, next) => {
    const user = new User({
        address: req.body.address,
        transactions: req.body.transactions
    })
    try {
        await user.save()
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
    return res.status(201).json({ success: true, data: user })
}

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({})
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: users })
}

const getUserByAddress = async (req, res, next) => {
    let user;
    try {
        user = await User.findOne({ address: req.params.address })
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
    if (!user) {
        return res.status(404).send('No user found')
    }
    return res.status(200).json({ success: true, data: user })
}

exports.addUser = addUser;
exports.getAllUsers = getAllUsers;
exports.getUserByAddress = getUserByAddress;

