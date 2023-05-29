/*jshint esversion: 8 */
import * as dotenv from 'dotenv';
import express from "express";
import * as bcrypt from 'bcrypt';
import User from '../models/user/user.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';

dotenv.config();
const router = express.Router();
const generateAccessToken = (_id) => {
  const payload = {
    userId: _id,
  };
  return jwt.sign(payload, `${process.env.SECRET}`, { expiresIn: "1h" });
};

const authMiddleware = () => passport.authenticate('jwt', { session: false });

router.post("/create", async (req, res) => {
  try {
    const email = req.body.email;
    const avatar = req.files.avatar;
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(400).send('User already exist');
    }
    else if (!avatar) {
      res.status(403).send('No file uploaded');
    }
    else if (!allowedTypes.includes(avatar.mimetype)) {
      res.status(403).send('forbidden file format');
    }
    else if (avatar.size > 300000) {
      res.status(403).send('file is too big');
    } else {
      const hadhPassword = await bcrypt.hash(req.body.password, 10);
      const newFilename = (uuidv4() + avatar.name);
      avatar.mv('./uploads/' + newFilename);
      const user = new User({
        email: req.body.email,
        password: hadhPassword,
        name: req.body.name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        avatarUrl: newFilename
      });
      try {
        await user.save();
      } catch (e) {
        console.log(e);
      }

    }
  } catch (e) { console.log(e); }
});

router.post("/auth", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('User not found');
    }
    const areEqual = await bcrypt.compare(req.body.password, user.password);
    if (areEqual) {
      const token = generateAccessToken(user._id, user.email);
      return res.json({ token, user });
    }
    else {
      res.status(403).send('Wrong password');
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/", authMiddleware(), async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const userId = decoded.userId;
    const users = await User.find();
    res.send(users.filter(user => user._id != userId));
  } catch (e) {
    console.log(e);
  }
});

router.get("/person", authMiddleware(), async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.put('/update', authMiddleware(), async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const userId = decoded.userId;
    const avatar = req.files.avatar;
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(avatar.mimetype)) {
      res.status(403).send('forbidden file format');
    } else if (avatar.size > 300000) {
      res.status(403).send('file is too big');
    } else {
      const hadhPassword = await bcrypt.hash(req.body.password, 10);
      const newFilename = (uuidv4() + avatar.name);
      avatar.mv('./uploads/' + newFilename);
      const changes = {
        name: req.body.name,
        password: hadhPassword,
        avatarUrl: newFilename
      };
      try {
        await User.findByIdAndUpdate(userId, changes);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) { console.log(e); }

});

router.post("/delete", authMiddleware(), async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const userId = decoded.userId;
    await User.findByIdAndDelete(userId);
  } catch (e) {
    console.log(e);
  }
});

export default router;