"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
/**
 * @swagger
 * components:
 *  schemas:
 *    addUsersValidation:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - fullname
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: marryjane
 *        fullname:
 *          type: string
 *          default: marry jane
 *        password:
 *          type: string
 *          default: stringPassword123
 *        alamat:
 *          type: string
 *          default: Jl. Aerok No. 45
 *        role:
 *          type: string
 *          default: Web Dev
 *    addUsersResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: CREATED
 *        data:
 *          type: object
 *          example:
 *            email: marryjane@gmail.com
 *            username: marryjane
 *            fullname: marry jane d
 *    GetUserByIdResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: marryjane
 *        fullname:
 *          type: string
 *          default: marry jane
 *        alamat:
 *          type: string
 *          default: Jl. Aerok No. 45
 *        role:
 *          type: string
 *          default: Web Dev
 *    UpdateUsersValidation:
 *      type: object
 *      required:
 *        - token
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: marryjane
 *        fullname:
 *          type: string
 *          default: marry jane
 *        password:
 *          type: string
 *          default: stringPassword123
 *        alamat:
 *          type: string
 *          default: Jl. Aerok No. 45
 *        role:
 *          type: string
 *          default: Web Dev
 *        profileUrl:
 *          type: jpg, png, jpeg
 *          default: profile.jpg
 *    UpdateUserByIdResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: marryjane
 *        fullname:
 *          type: string
 *          default: marry jane
 *        alamat:
 *          type: string
 *          default: Jl. Aerok No. 45
 *        role:
 *          type: string
 *          default: Web Dev
 *        profileUrl:
 *          type: string
 *          default: http://localhost:8080/profile.jpg
 *    UnauthorizedResponse:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          default: Unauthorized
 *    LogoutResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: LOGOUT
 *        data:
 *          type: string
 *          example: User dengan nama marryjane sudah logout
 *    usergetlearning:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: SUCCESS
 *        data:
 *          type: object
 *          example:
 *            useremail: marryjane@gmail.com
 *            learningId: 2
 *    learningNotFound:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          default: Learning Path tidak ditemukan
 *    learningHasGated:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          default: Learning Path sudah diambil
 *    usergetSkorlearning:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: SUCCESS
 *        data:
 *          type: string
 *          default: Skor telah diupdate
 *    authentication:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          example: marryjane
 *        password:
 *          type: string
 *          example: stringPassword123
 *    ErrorAuth:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          default: Username atau Password salah
 *    UserHasBeenAdd:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          default: Username atau Email sudah digunakan
 *    feedbackresponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          example: CREATED
 *        note:
 *          type: string
 *          example: Feedback telah ditambahkan
 *    feedback:
 *      type: object
 *      properties:
 *        note:
 *          type: string
 *          example: aplikasinya cukup responsive
 *
 */
const addUsersValidation = joi_1.default.object({
    email: joi_1.default.string().max(100).required(),
    username: joi_1.default.string().max(100).required(),
    fullname: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).required(),
    alamat: joi_1.default.string().max(100).optional(),
    role: joi_1.default.string().max(50).optional(),
    profileUrl: joi_1.default.string().optional()
});
const loginUserValidation = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).required()
});
const emailorusernameValidation = joi_1.default.string().max(100).required();
const updateValidation = joi_1.default.object({
    email: joi_1.default.string().max(100).optional(),
    username: joi_1.default.string().max(100).optional(),
    fullname: joi_1.default.string().max(100).optional(),
    alamat: joi_1.default.string().max(100).optional(),
    role: joi_1.default.string().max(50).optional(),
    profileUrl: joi_1.default.string().optional().allow(null)
});
const skorValidation = joi_1.default.number().positive().min(1).required();
const feedbackValidation = joi_1.default.string().required();
exports.default = {
    addUsersValidation,
    loginUserValidation,
    emailorusernameValidation,
    updateValidation,
    feedbackValidation,
    skorValidation
};
