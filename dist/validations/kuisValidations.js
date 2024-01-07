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
 *      createKuis:
 *          type: object
 *          required:
 *              - soal
 *              - opsi_a
 *              - opsi_b
 *              - opsi_c
 *              - opsi_d
 *              - jawaban
 *              - learning_id
 *          properties:
 *              soal:
 *                  type: string
 *                  example: Siapakah dalang dibalik G30
 *              opsi_a:
 *                  type: string
 *                  example: Hitler
 *              opsi_b:
 *                  type: string
 *                  example: Kak Gem
 *              opsi_c:
 *                  type: string
 *                  example: Messi
 *              opsi_d:
 *                  type: string
 *                  example: zukebek
 *              jawaban:
 *                  type: string
 *                  example: a
 *              learning_id:
 *                  type: number
 *                  example: 2
 *      createKuisResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: CREATED
 *              data:
 *                  type: object
 *                  example:
 *                      soal: Siapakah dalang dibalik G30,
 *                      opsi_a: Hitler
 *                      opsi_b: Kak Gem
 *                      opsi_c: Messi
 *                      opsi_d: zukebek
 *                      jawaban: a
 *                      learning_id: 2
 *      updateKuis:
 *          type: object
 *          required:
 *              - soal
 *              - opsi_a
 *              - opsi_b
 *              - opsi_c
 *              - opsi_d
 *              - jawaban
 *              - learning_id
 *          properties:
 *              soal:
 *                  type: string
 *                  example: Siapakah dalang dibalik G30
 *              opsi_a:
 *                  type: string
 *                  example: Hitler
 *              opsi_b:
 *                  type: string
 *                  example: Kak Gem
 *              opsi_c:
 *                  type: string
 *                  example: Messi
 *              opsi_d:
 *                  type: string
 *                  example: zukebek
 *              jawaban:
 *                  type: string
 *                  example: a
 *      updateKuisResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: UPDATED
 *              data:
 *                  type: object
 *                  example:
 *                      soal: Siapakah dalang dibalik G30,
 *                      opsi_a: Hitler
 *                      opsi_b: Kak Gem
 *                      opsi_c: Messi
 *                      opsi_d: zukebek
 *                      jawaban: a
 *      deleteKuisResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: DELETED
 *              data:
 *                  type: string
 *                  default: Kuis telah dihapus
 *      errorNotFoundKuisResponse:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  default: Kuis tidak ada
 */
const addKuisValidation = joi_1.default.object({
    soal: joi_1.default.string().required(),
    opsi_a: joi_1.default.string().required(),
    opsi_b: joi_1.default.string().required(),
    opsi_c: joi_1.default.string().required(),
    opsi_d: joi_1.default.string().required(),
    jawaban: joi_1.default.string().required(),
    learning_id: joi_1.default.number().required()
});
const updateKuisValidation = joi_1.default.object({
    soal: joi_1.default.string().required(),
    opsi_a: joi_1.default.string().required(),
    opsi_b: joi_1.default.string().required(),
    opsi_c: joi_1.default.string().required(),
    opsi_d: joi_1.default.string().required(),
    jawaban: joi_1.default.string().required(),
});
const idKuisValidation = joi_1.default.number().positive().min(1).required();
exports.default = { addKuisValidation, updateKuisValidation, idKuisValidation };
