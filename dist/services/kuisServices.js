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
const kuisValidations_1 = __importDefault(require("../validations/kuisValidations"));
const database_1 = __importDefault(require("../applications/database"));
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
const addKuis = (dataKuis) => __awaiter(void 0, void 0, void 0, function* () {
    const kuisData = (0, validate_1.default)(kuisValidations_1.default.addKuisValidation, dataKuis);
    const cekLearning = yield database_1.default.learningpath.count({
        where: {
            id: kuisData.learning_id
        }
    });
    if (!cekLearning) {
        throw new ResponseError_1.default(404, 'Learning Path tidak ditemukan');
    }
    return database_1.default.kuis.create({
        data: kuisData
    });
});
const updateKuis = (dataKuis, id) => __awaiter(void 0, void 0, void 0, function* () {
    const Kuisdata = (0, validate_1.default)(kuisValidations_1.default.updateKuisValidation, dataKuis);
    const idKuis = (0, validate_1.default)(kuisValidations_1.default.idKuisValidation, id);
    const cekKuis = yield database_1.default.kuis.findUnique({
        where: {
            id: idKuis
        }
    });
    if (!cekKuis) {
        throw new ResponseError_1.default(404, 'Kuis tidak ditemukan');
    }
    return database_1.default.kuis.update({
        where: {
            id: idKuis
        },
        data: Kuisdata,
    });
});
const deleteKuis = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idKuis = (0, validate_1.default)(kuisValidations_1.default.idKuisValidation, id);
    const cekKuis = yield database_1.default.kuis.findUnique({
        where: {
            id: idKuis
        }
    });
    if (!cekKuis) {
        throw new ResponseError_1.default(404, 'Kuis tidak ditemukan');
    }
    return database_1.default.kuis.delete({
        where: {
            id: idKuis
        }
    });
});
exports.default = { addKuis, updateKuis, deleteKuis };
