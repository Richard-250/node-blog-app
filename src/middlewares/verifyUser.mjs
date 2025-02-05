import User from "../database/models/user.mjs";

const verifyUser = async (req, res, next) => {
    try {
        const exists = await User.findOne({ email: req.body.email });
        if (exists) {
            return res.status(400).json({ status: false, message: 'Email Already Exists' });
        }
        next()
    } catch (err) {
        res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
    }
}


export default verifyUser;