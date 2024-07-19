// Controllers for Post

import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Post from "../models/post.model.js";

export const getMe = async (req, res) => {
    const UserId = req.params.id;

    try {
        const user = await User.findById(UserId).select("-password");
        const posts = await Post.find({ author: user._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!posts) {
            return res.status(404).json({ error: "No posts found for this user" });
        }

        res.status(200).json({ user: user, posts: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}


export const editPost = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const editPost2 = async (req, res) => {
    const userId = req.params.userId;
    const { username, email, bio } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail && existingEmail._id.toString() !== userId) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            bio,
        });

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at leats 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        res.status(201).json({
            Userid: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profileImg: newUser.profileImg,
            bio: newUser.bio
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
        console.log(error);
    }

}

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const accessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' })


        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            profileImg: user.profileImg,
            bio: user.bio,
            accessToken: accessToken
        })

    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = async (req, res) => {
    const { username, oldpassword, newpassword } = req.body;

    try {
        const user = await User.findOne({ username: username });

        const isPasswordCorrect = await bcrypt.compare(oldpassword, user?.password || '')

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: "wrong username or password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

export const LogOut = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}