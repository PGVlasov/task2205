/*jshint esversion: 11 */
import * as dotenv from 'dotenv';
import express from "express";
import bodyParser from 'body-parser';
import { connect } from "mongoose";
import cors from "cors";
import fileUpload from 'express-fileupload';
import passport from 'passport';
import userRouter from './src/routes/user.js';
import { authMiddleware } from './src/middleware/authJwtMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const __filename = process.env.URL;
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(fileUpload({
  createParentPath: true, limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json());
authMiddleware(passport);
app.use('/users', userRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(passport.initialize());

const start = async () => {
  try {
    await connect(
      process.env.DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
      }
    );
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();