"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userhandler_1 = __importDefault(require("../handler/userhandler"));
const publicRouter = express_1.default.Router();
const controlUser = new userhandler_1.default();
publicRouter.route('/public/users').post(controlUser.registerUser);
publicRouter.route('/public/authentication').post(controlUser.authenticationHandler);
exports.default = publicRouter;
