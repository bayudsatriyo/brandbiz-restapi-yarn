"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userhandler_1 = __importDefault(require("../handler/userhandler"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const multer_1 = __importDefault(require("multer"));
const path = require("path");
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, 'src/profile');
    },
    filename(req, file, cb) {
        req.format = req.user.username + path.extname(file.originalname);
        cb(null, `${req.format}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const userRoutes = express_1.default.Router();
const controlUser = new userhandler_1.default();
userRoutes.use(auth_middleware_1.authMiddleware);
// users Route
userRoutes.route('/brandbiz/user')
    .get(controlUser.getUserByUsernameHandler)
    .put(upload.single('profileUrl'), controlUser.updateUserHandler)
    .delete(controlUser.logoutUserHandler);
userRoutes.route('/brandbiz/user/:idLearning').post(controlUser.usergetlearningHandler);
userRoutes.route('/brandbiz/user/learning/:idLearning/skor/:skor').put(controlUser.userUpdateSkor);
// Feedback Routes
userRoutes.route('/brandbiz/feedback').post(controlUser.userAddFeedbackHandler);
exports.default = userRoutes;
