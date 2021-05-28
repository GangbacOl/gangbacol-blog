import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in',
        });
    }

    await jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error)
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        req.decoded = decoded;
        next();
    });
};
