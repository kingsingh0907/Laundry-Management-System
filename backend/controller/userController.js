import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import verifyToken from "../auth.js";
import cloudinary from "../cloudinary.js";
import User from "../models/userSchema.js";

dotenv.config({ path: "./config.env" });

const userRoutes = Router();

userRoutes.use(cookieParser());

export const userHome = async function (req, res) {

    try {

        const token = req.cookies.jwtoken;

        const result = await verifyToken(token);

        if (result.success) {
            console.log("Authorization successfull");
            return res.status(200).json({ Message: "User is Authorized" });
        } else {
            throw new Error("User Not Found")
        }

    } catch (err) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(err);
    }
}

export const userRegister = async function (req, res) {

    let { name, email, phone, registration, room, password} = req.body;

    let userId = room.slice(0, 1) + room.slice(3, 4);

    try {
        const findUser = await User.findOne({ email: email });

        if (findUser) {
            return res.status(409).json({ error: "Email already registered!" });
        } else {

            const hash = await bcrypt.hash(password, 12);

            const user = new User({ role: "user", userId, name, email, phone, registration, room, password: hash, index: 0 });

            await user.save();

            console.log("User Saved Successfully");
            res.send("User Saved Successfully");

        }

    } catch (err) {
        console.log(err);
    }

}

export const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the required fields!!!" });
        }
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {

            const isMatch = await bcrypt.compare(password, findUser.password);

            if (isMatch) {

                // Generating token using jsonwebtoken
                let token = jsonwebtoken.sign({ _id: findUser._id }, process.env.SECRET_KEY);
                findUser.tokens = findUser.tokens.concat({ token: token });

                // Creating cookie using the generated token
                res.cookie("jwtoken", token, {
                    expiresIn: new Date(Date.now + 86400000),
                    httpOnly: false
                });

                await findUser.save();
                console.log("User Login Successfull!!!");
                return res.json({ message: "User Login Successfull!!!" });

            } else {
                return res.status(401).json({ error: "Invalid Credentials!!! pass" });
            }
        }
    } catch (err) {
        console.log(err);
    }

}


export const userGetData = async function (req, res) {

    try {
        const token = req.cookies.jwtoken;

        const result = await verifyToken(token);

        if (result.success) {
            console.log("Authorization successfull");
            res.send(result.user);
        } else {
            throw new Error("User Not Found")
        }

    } catch (err) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(err);
    }

}

export const userComplaint = async (req, res) => {

    try {

        const token = req.body.cookieValue;

        const result = await verifyToken(token);

        if (result.success) {
            const { name, email, phone, message } = req.body.userData;

            if (!name || !email || !phone || !message) {
                console.log("Error in complaint form");
                return res.status(422).json({ error: "Please fill the complaint form" });
            }

            const rootUser = result.user;
            const userContact = await User.findOne({ _id: rootUser._id });

            if (userContact) {
                var systemOtp = Math.round(Math.random() * 100) + 1;

                if (systemOtp < 10) {
                    systemOtp += 10;
                }
                const id = rootUser.userId + systemOtp;

                userContact.messages.push({ name, email, phone, message });
                // userContact.messages = userContact.messages.concat({ name, email, phone, message });

                await userContact.save();

                return res.status(201).json({ message: "User Complaint Successfull" })
            }

        } else {
            throw new Error("User Not Found")
        }

    } catch (error) {
        console.log(error);
    }

}

export const userAddClothes = async (req, res) => {

    try {
        const token = req.body.cookieValue;

        const result = await verifyToken(token);

        if (result.success) {
            const { shirt, pent, tShirt, lower, shorts, towel, pillowCover, bedSheet } = (req.body.user);

            if (shirt > 0 || pent > 0 || tShirt > 0 || lower > 0 || shorts > 0 || towel > 0 || pillowCover > 0 || bedSheet) {

                const rootUser = result.user;
                const userContact = await User.findOne({ _id: rootUser._id });

                if (userContact) {

                    const currIndex = userContact.index;

                    const userContacted = await User.findOneAndUpdate({ _id: rootUser._id }, { index: currIndex + 1 });
                    await userContacted.save();

                    // userContact.clothes = userContact.clothes.concat({ serialNo:"2",shirt, pent, tShirt, lower, shorts, towel, pillowCover, bedSheet });
                    userContact.clothes.push({ serialNo: currIndex + 1, shirt: shirt || 0, pent: pent || 0, tShirt: tShirt || 0, lower: lower || 0, shorts: shorts || 0, towel: towel || 0, pillowCover: pillowCover || 0, bedSheet: bedSheet || 0 });
                    await userContact.save();

                    res.status(201).json({ message: "User Clothes added Successfully" })
                }
            }

        } else {
            throw new Error("User Not Found")
        }

    } catch (error) {
        console.log(error);
    }

}

export const userUpdateProfile = async (req, res) => {

    try {

        const token = req.body.cookieValue;

        const result = await verifyToken(token);

        if (result.success) {

            const fileString = req.body.data;

            const uploadedResponse = await cloudinary.uploader.
                upload(fileString, {
                    upload_preset: "i91jqvyx",

                }).then(async (uploadedImg) => {
                    console.log("Image Saved Successfully");
                    console.log(uploadedImg.secure_url);

                    const rootUser = result.user;
                    const userContact = await User.findOne({ _id: rootUser._id });

                    if (userContact) {

                        await User.findOneAndUpdate({ _id: rootUser._id }, { image: uploadedImg.secure_url });

                        res.status(201).json({ message: "Image Added Successfully" });
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            throw new Error("User Not Found")
        }

    } catch (error) {
        console.log(error);
    }

}
