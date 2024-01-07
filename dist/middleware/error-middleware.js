"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
function errorMiddleware(err, _req, res, next) {
    if (err === undefined || err === null) {
        next();
        return;
    }
    if (err instanceof ResponseError_1.default) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    }
    else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}
exports.default = errorMiddleware;
