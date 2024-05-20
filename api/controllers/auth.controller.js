import { errorHandler } from "../utils/errorHandler.js";
import User from "./../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All fields are required."));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        next(errorHandler(400, "All fields are required."));
    }

    try {
        let user;
        const isEmail = validateEmail(username);
        if (isEmail) {
            user = await User.findOne({ email: username });
        } else {
            user = await User.findOne({ username: username });
        }
        if (!user) {
            return next(errorHandler(400, "Please provide valide details"));
        }

        const validPass = bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return next(errorHandler(400, "Please provide valide details"));
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = user._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
}

export const googleAuth = async (req, res, next) => {
    const { name, email, photoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(20).slice(-8),
                email,
                password: hashedPassword,
                profilePicture: photoUrl
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}