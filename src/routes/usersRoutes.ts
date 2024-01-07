import express from 'express'
import Userhandler from '../handler/userhandler'
import { authMiddleware } from '../middleware/auth-middleware'
import multer from 'multer'
import { Request } from "express";
import path = require('path');

type DestinationCallback = (error: Error | null, destination: string) => void
type FilenameCallback = (error: Error | null, filename: string) => void


const storage = multer.diskStorage({
  destination(_req: Request, _file: Express.Multer.File, cb: DestinationCallback) {
    cb(null, 'src/profile');
  },
  filename(req: Request, file: Express.Multer.File, cb: FilenameCallback) {
    req.format = req.user.username + path.extname(file.originalname)
    cb(null, `${req.format}`);
  },
});

const upload = multer({ storage: storage });

const userRoutes = express.Router()
const controlUser = new Userhandler()

userRoutes.use(authMiddleware)


// users Route
userRoutes.route('/brandbiz/user')
  .get(controlUser.getUserByUsernameHandler)
  .put(upload.single('profileUrl'), controlUser.updateUserHandler)
  .delete(controlUser.logoutUserHandler)


userRoutes.route('/brandbiz/user/:idLearning').post(controlUser.usergetlearningHandler)
userRoutes.route('/brandbiz/user/learning/:idLearning/skor/:skor').put(controlUser.userUpdateSkor)

// Feedback Routes
userRoutes.route('/brandbiz/feedback').post(controlUser.userAddFeedbackHandler)


export default userRoutes