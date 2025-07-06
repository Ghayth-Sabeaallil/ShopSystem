import express from "express";
import UserModel from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        const { marketId, username, password, role } = req.body;
        let user = await UserModel.findOne({ marketId });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!user) {
            const newUser = new UserModel({
                marketId,
                employees: [{ username, password: hashedPassword, role }]
            });
            await newUser.save();
            res.status(200).json({ msg: 'User and market created successfully' });
        } else {
            const existingEmployee = user.employees.find(emp => emp.username === username);
            if (existingEmployee) {
                res.status(400).json({ msg: 'User already exists in this market' });
            } else {
                user.employees.push({ username, password: hashedPassword, role });
                await user.save();
                res.status(200).json({ msg: 'Employee added successfully' });
            }
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

userRouter.get('/verify', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ authenticated: false });
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).json({ authenticated: true, user: decoded.username, role: decoded.role });

        }

    } catch (error) {
        res.status(401).json({ authenticated: false, msg: 'Invalid token' });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { marketId, username, password } = req.body;
        const user = await UserModel.findOne({
            marketId,
            'employees.username': username
        });
        if (user) {
            const employee = user.employees.find(emp => emp.username === username);
            if (employee) {
                const isMatch = await bcrypt.compare(password, employee.password);
                if (isMatch) {
                    const token = jwt.sign({ marketId, username, userId: user._id, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none" });
                    res.cookie('username', username, { secure: true, sameSite: "none" });
                    res.cookie('role', employee.role, { secure: true, sameSite: "none" });
                    res.status(200).json({ msg: 'Login successful' });
                } else {
                    res.status(401).json({ msg: 'Wrong password or username' });
                }
            } else {
                res.status(401).json({ msg: 'Wrong password or username' });
            }
        } else {
            res.status(401).json({ msg: 'Wrong password or username' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

userRouter.post('/logout', ({ res }: any) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.clearCookie('role', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.clearCookie('username', {
        secure: true,
        sameSite: "none",
    });
    res.json({ msg: 'Logged out' });
});

export default userRouter;