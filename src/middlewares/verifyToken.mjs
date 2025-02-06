import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
            }
            req.user = decoded;
            next();
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export default verifyToken  