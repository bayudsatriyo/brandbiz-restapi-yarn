"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../applications/database"));
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
const validate_1 = __importDefault(require("../validations/validate"));
const usersValidation_1 = __importDefault(require("../validations/usersValidation"));
const learningValidation_1 = __importDefault(require("../validations/learningValidation"));
const addUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = (0, validate_1.default)(usersValidation_1.default.addUsersValidation, users);
    const cekUser = yield database_1.default.user.count({
        where: {
            username: userData.username
        }
    });
    if (cekUser === 1) {
        throw new ResponseError_1.default(400, 'Username atau email sudah digunakan');
    }
    userData.password = yield bcrypt_1.default.hash(userData.password, 10);
    const DataUser = yield database_1.default.user.create({
        data: userData,
        select: {
            email: true,
            username: true,
            fullname: true
        }
    });
    return DataUser;
});
const authentication = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = (0, validate_1.default)(usersValidation_1.default.loginUserValidation, users);
    const cekUser = yield database_1.default.user.findUnique({
        where: {
            username: userData.username,
        },
        select: {
            username: true,
            password: true
        }
    });
    if (cekUser === null || cekUser === undefined) {
        throw new ResponseError_1.default(400, 'Username atau password salah');
    }
    console.log(cekUser.password);
    console.log(userData.password);
    const cekPassword = yield bcrypt_1.default.compare(userData.password, cekUser.password);
    console.log(cekPassword);
    if (cekPassword === false) {
        throw new ResponseError_1.default(404, 'Username atau Password salah');
    }
    const newToken = (0, uuid_1.v4)().toString();
    const UserToken = yield database_1.default.user.update({
        where: {
            username: userData.username
        },
        data: {
            token: newToken
        },
        select: {
            token: true
        }
    });
    return UserToken;
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(usersValidation_1.default.emailorusernameValidation, username);
    const cekUser = yield database_1.default.user.count({
        where: {
            username: username
        }
    });
    if (!cekUser) {
        throw new ResponseError_1.default(404, 'User tidak ditemukan');
    }
    const dataUser = yield database_1.default.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            email: true,
            fullname: true,
            alamat: true,
            role: true,
            profileUrl: true
        }
    });
    return dataUser;
});
const updateUser = (userdata, username) => __awaiter(void 0, void 0, void 0, function* () {
    const dataUser = (0, validate_1.default)(usersValidation_1.default.updateValidation, userdata);
    const updateUser = yield database_1.default.user.update({
        where: {
            username: username
        },
        data: dataUser,
        select: {
            username: true,
            email: true,
            fullname: true,
            role: true,
            profileUrl: true
        }
    });
    return updateUser;
});
const logoutUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(usersValidation_1.default.emailorusernameValidation, username);
    const deleteToken = yield database_1.default.user.update({
        where: {
            username: username,
        },
        data: {
            token: null,
        },
        select: {
            username: true
        }
    });
    return deleteToken.username;
});
const userGetLearning = (useremail, idLearning) => __awaiter(void 0, void 0, void 0, function* () {
    const Useremail = (0, validate_1.default)(usersValidation_1.default.emailorusernameValidation, useremail);
    const IdLearning = (0, validate_1.default)(learningValidation_1.default.idLearningpath, idLearning);
    const cekLearning = yield database_1.default.learningpath.count({
        where: {
            id: IdLearning
        }
    });
    if (!cekLearning) {
        throw new ResponseError_1.default(404, 'Learning Path tidak ditemukan');
    }
    const cekUserLearning = yield database_1.default.userhaslearning.count({
        where: {
            useremail: Useremail,
            learningId: IdLearning
        }
    });
    if (cekUserLearning >= 1) {
        throw new ResponseError_1.default(403, 'Learning path sudah diambil');
    }
    return database_1.default.userhaslearning.create({
        data: {
            useremail: Useremail,
            learningId: IdLearning
        },
        select: {
            useremail: true,
            learningId: true
        }
    });
});
const updateSkorLearningPath = (useremail, idLearning, skor) => __awaiter(void 0, void 0, void 0, function* () {
    const Useremail = (0, validate_1.default)(usersValidation_1.default.emailorusernameValidation, useremail);
    const IdLearning = (0, validate_1.default)(learningValidation_1.default.idLearningpath, idLearning);
    const skorUser = (0, validate_1.default)(usersValidation_1.default.skorValidation, skor);
    const cekLearning = yield database_1.default.userhaslearning.findFirst({
        where: {
            useremail: Useremail,
            learningId: IdLearning
        }
    });
    if (!cekLearning) {
        throw new ResponseError_1.default(404, 'Learning path tidak ada');
    }
    yield database_1.default.userhaslearning.updateMany({
        where: {
            AND: [
                {
                    useremail: Useremail
                },
                {
                    learningId: IdLearning
                }
            ]
        },
        data: {
            skor: skorUser
        }
    });
    return "Skor telah diupdate";
});
const userAddFeedback = (username, note) => __awaiter(void 0, void 0, void 0, function* () {
    const noteFeedback = (0, validate_1.default)(usersValidation_1.default.feedbackValidation, note);
    return database_1.default.feedback.create({
        data: {
            note: noteFeedback,
            username: username
        },
        select: {
            username: true,
            note: true
        }
    });
});
exports.default = {
    addUsers,
    authentication,
    getUserByUsername,
    updateUser,
    logoutUser,
    userGetLearning,
    updateSkorLearningPath,
    userAddFeedback
};
