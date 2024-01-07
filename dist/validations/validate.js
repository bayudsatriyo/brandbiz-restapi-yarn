"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseError_1 = __importDefault(require("../exceptions/ResponseError"));
const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });
    if (result.error != null) {
        throw new ResponseError_1.default(400, result.error.message);
    }
    else {
        return result.value;
    }
};
exports.default = validate;
