import Joi from "joi";

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

const addKuisValidation = Joi.object({
    soal: Joi.string().required(),
    opsi_a: Joi.string().required(),
    opsi_b: Joi.string().required(),
    opsi_c: Joi.string().required(),
    opsi_d: Joi.string().required(),
    jawaban: Joi.string().required(),
    learning_id: Joi.number().required()
})

const updateKuisValidation = Joi.object({
    soal: Joi.string().required(),
    opsi_a: Joi.string().required(),
    opsi_b: Joi.string().required(),
    opsi_c: Joi.string().required(),
    opsi_d: Joi.string().required(),
    jawaban: Joi.string().required(),
})

const idKuisValidation = Joi.number().positive().min(1).required()

export default { addKuisValidation, updateKuisValidation, idKuisValidation }