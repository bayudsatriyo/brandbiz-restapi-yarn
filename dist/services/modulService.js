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
const modulValidations_1 = __importDefault(require("../validations/modulValidations"));
const database_1 = __importDefault(require("../applications/database"));
const learningValidation_1 = __importDefault(require("../validations/learningValidation"));
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
const cekJudul = (judul) => __awaiter(void 0, void 0, void 0, function* () {
    const cekModul = yield database_1.default.modul.count({
        where: {
            judul: judul
        }
    });
    if (cekModul === 1) {
        throw new ResponseError_1.default(403, 'Judul modul sudah ada, silahkan ganti judul lain');
    }
});
const addModul = (idLearning, data, image) => __awaiter(void 0, void 0, void 0, function* () {
    const dataModul = (0, validate_1.default)(modulValidations_1.default.addModulValidation, data);
    const IdLearning = (0, validate_1.default)(learningValidation_1.default.idLearningpath, idLearning);
    if (image !== undefined) {
        dataModul.gambar = `http://localhost:8080/brandbiz/modul/${image}`;
    }
    const cekLearning = yield database_1.default.learningpath.count({
        where: {
            id: IdLearning
        }
    });
    if (!cekLearning) {
        throw new ResponseError_1.default(404, 'Learning Path tidak ditemukan');
    }
    yield cekJudul(dataModul.judul);
    const addModul = yield database_1.default.modul.create({
        data: {
            judul: dataModul.judul,
            inti_materi: dataModul.inti_materi,
            tambahan: dataModul.tambahan,
            gambar: dataModul.gambar,
            video: dataModul.video,
            learning_id: IdLearning
        },
    });
    return addModul;
});
const updateModul = (data, idmodul, image) => __awaiter(void 0, void 0, void 0, function* () {
    const dataModul = (0, validate_1.default)(modulValidations_1.default.addModulValidation, data);
    const idModul = (0, validate_1.default)(learningValidation_1.default.idLearningpath, idmodul);
    if (image !== undefined) {
        dataModul.gambar = `http://localhost:8080/brandbiz/modul/${image}`;
    }
    const cekModul = yield database_1.default.modul.count({
        where: {
            id: idModul
        }
    });
    if (!cekModul) {
        throw new ResponseError_1.default(404, 'id tidak ditemukan');
    }
    yield cekJudul(dataModul.judul);
    return database_1.default.modul.update({
        where: {
            id: idModul
        },
        data: dataModul
    });
});
const deleteModul = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idModul = (0, validate_1.default)(learningValidation_1.default.idLearningpath, id);
    const cekModul = yield database_1.default.modul.count({
        where: {
            id: idModul
        }
    });
    if (!cekModul) {
        throw new ResponseError_1.default(404, 'id tidak ditemukan');
    }
    return database_1.default.modul.delete({
        where: {
            id: idModul
        },
        select: {
            judul: true
        }
    });
});
exports.default = { addModul, updateModul, deleteModul };
