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
const modulService_1 = __importDefault(require("../services/modulService"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
class ModulHandler {
    addModul(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdLearning = parseInt(req.params.idLearning);
                const data = req.body;
                const image = `${req.format}-${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`;
                const result = yield modulService_1.default.addModul(IdLearning, data, image);
                res.status(201).json({
                    status: 'CREATED',
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
    getGambarMateri(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.params.image;
                console.log(image);
                // const __dirname = dirname();
                const filePath = path_1.default.join(__dirname, '..', 'uploads', image);
                res.sendFile(filePath);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateModulHandler(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const idModul = parseInt(req.params.idModul);
                const image = `${req.format}-${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`;
                const result = yield modulService_1.default.updateModul(data, idModul, image);
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
    deleteModulHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.idLearning);
                const result = yield modulService_1.default.deleteModul(id);
                res.status(200).json({
                    status: 'DELETED',
                    message: `modul ${result.judul} sudah terhapus`
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = ModulHandler;
