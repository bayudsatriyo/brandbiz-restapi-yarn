"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const fs = __importStar(require("fs"));
class Userhandler {
    constructor() {
        this.deleteFile = (fileName, extensions) => {
            // membuat loop untuk setiap ekstensi
            for (let ext of extensions) {
                // membuat path lengkap dari file dengan nama dan ekstensi
                let filePath = `./profile/${fileName}.${ext}`;
                // menggunakan metode fs.unlink untuk menghapus file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log('gagal menghapus gambar');
                    }
                });
            }
        };
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = req.body;
                console.log(users);
                const result = yield userService_1.default.addUsers(users);
                res.status(201).json({
                    status: 'CREATED',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    authenticationHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const result = yield userService_1.default.authentication(user);
                res.status(200).json({
                    status: 'SUCCESS',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUserByUsernameHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.user.username;
                const result = yield userService_1.default.getUserByUsername(username);
                res.status(200).json({
                    status: 'SUCCESS',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateUserHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataUser = req.body;
                const username = req.user.username;
                let image;
                console.log(req.file);
                if (req.file !== undefined) {
                    image = req.format;
                    dataUser.profileUrl = `http://localhost:8080/brandbiz/user/image/${image}`;
                }
                else {
                    for (let ext of ['jpg', 'png', 'jpeg']) {
                        // membuat path lengkap dari file dengan nama dan ekstensi
                        let filePath = `src/profile/${username}.${ext}`;
                        // menggunakan metode fs.unlink untuk menghapus file
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.log('sedang mencari');
                            }
                            console.log('path/file.txt was deleted');
                        });
                    }
                    console.log('sudah dihapus');
                    dataUser.profileUrl = null;
                }
                console.log(dataUser);
                const result = yield userService_1.default.updateUser(dataUser, username);
                res.status(200).json({
                    status: 'UPDATED',
                    data: result
                });
            }
            catch (e) {
                if (req.file !== undefined) {
                    fs.unlinkSync(req.file.path);
                }
                next(e);
            }
        });
    }
    logoutUserHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.user.username;
                const result = yield userService_1.default.logoutUser(username);
                res.status(200).json({
                    status: 'LOGOUT',
                    data: `User dengan nama ${result} sudah logout`
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    usergetlearningHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const useremail = req.user.email;
                const idLearning = parseInt(req.params.idLearning);
                const result = yield userService_1.default.userGetLearning(useremail, idLearning);
                res.status(200).json({
                    status: 'SUCCESS',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    userUpdateSkor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const useremail = req.user.email;
                const idLearning = parseInt(req.params.idLearning);
                const skorUser = parseInt(req.params.skor);
                const result = yield userService_1.default.updateSkorLearningPath(useremail, idLearning, skorUser);
                res.status(200).json({
                    status: 'UPDATED',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    userAddFeedbackHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.user.username;
                const note = req.body.note;
                console.log(username);
                console.log(note);
                const result = yield userService_1.default.userAddFeedback(username, note);
                res.status(201).json({
                    status: 'SUCCESS',
                    data: result
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = Userhandler;
