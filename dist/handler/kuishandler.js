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
const kuisServices_1 = __importDefault(require("../services/kuisServices"));
class KuisHandler {
    addKuis(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataKuis = req.body;
                dataKuis.learning_id = parseInt(dataKuis.learning_id);
                const result = yield kuisServices_1.default.addKuis(dataKuis);
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
    updateKuisByIdHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataKuis = req.body;
                const idKuis = parseInt(req.params.id);
                console.log(dataKuis);
                console.log(idKuis);
                const result = yield kuisServices_1.default.updateKuis(dataKuis, idKuis);
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
    deleteKuisById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idKuis = parseInt(req.params.id);
                yield kuisServices_1.default.deleteKuis(idKuis);
                res.status(200).json({
                    status: 'DELETED',
                    message: 'Kuis sudah terhapus'
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = KuisHandler;
