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
const validate_1 = __importDefault(require("../validations/validate"));
const learningValidation_1 = __importDefault(require("../validations/learningValidation"));
const database_1 = __importDefault(require("../applications/database"));
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
const addLearning = (data, format) => __awaiter(void 0, void 0, void 0, function* () {
    const dataLearning = (0, validate_1.default)(learningValidation_1.default.addLearningValidation, data);
    // const fileData = validate(learningValidation.addLearningValidation, filename)
    const cekJudul = yield database_1.default.learningpath.findUnique({
        where: {
            judul: dataLearning.judul
        }
    });
    if (cekJudul) {
        throw new ResponseError_1.default(400, 'Judul sudah ada, silahkan ganti judul lain');
    }
    const Learningdata = yield database_1.default.learningpath.create({
        data: {
            judul: dataLearning.judul,
            imageUrl: `http://localhost:8080/brandbiz/learning/${format}-${dataLearning.imageUrl}`
        }
    });
    return Learningdata;
});
const getAllLearningpath = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataLearningPath = yield database_1.default.learningpath.findMany();
    return dataLearningPath;
});
const getLarningPathById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idLearning = (0, validate_1.default)(learningValidation_1.default.idLearningpath, id);
    const cekLearning = yield database_1.default.learningpath.count({
        where: {
            id: idLearning
        }
    });
    if (!cekLearning) {
        throw new ResponseError_1.default(404, 'Learning path tidak ditemukan');
    }
    return database_1.default.learningpath.findUnique({
        where: {
            id: idLearning
        },
        select: {
            id: true,
            judul: true,
            imageUrl: true,
            modul: true,
            kuis: true
        }
    });
});
const deleteLearningPath = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idlearning = (0, validate_1.default)(learningValidation_1.default.idLearningpath, id);
    const judul = yield database_1.default.learningpath.delete({
        where: {
            id: idlearning
        },
        select: {
            judul: true
        }
    });
    return judul.judul;
});
exports.default = { addLearning, getAllLearningpath, deleteLearningPath, getLarningPathById };
