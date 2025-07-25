import userModel from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default class User {

   async register(req, res) {
    try {
        const { email, fullName, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const registerUser = await userModel.create({
            email,
            fullName,
            password: hashedPassword
        });
        res.status(200).json({
            message: `User registered successfully .....`,
            registerUser
        });

    } catch (error) {
        return res.status(500).json({ Err: error.message });
    }
}

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(403).json({ error: "Invalid User Credential!" });
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(403).json({ error: "Invalid User Credential!" });
            }
            const payload = {
                userId: user._id,
                email: user.email,
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

            return res.status(200).json({
                message: "Login successful",
                token,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    getAllUser = async (req, res) => {
        try {
            return res.status(200).json(await userModel.find({}));
        } catch (err) {
            return res.status(500).json({ err })
        }
    }

    findByEmail = async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.params.email });
            if (!user) {
                return res.status(404).json({ Error: 'User Does not Exist' })
            }
            return res.status(200).json({ User: user });
        } catch (err) {
            return res.status(500).json({ err })
        }
    }

    async verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
}


}