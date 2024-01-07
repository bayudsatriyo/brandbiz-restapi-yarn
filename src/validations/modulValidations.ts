import Joi from "joi";

/**
 * @swagger
 * components:
 *  schemas:
 *      createModul:
 *          type: object
 *          required:
 *              - judul
 *              - inti_materi
 *          properties:
 *              judul:
 *                  type: string
 *                  example: Pengertian Branding Produk
 *              inti_materi:
 *                  type: string
 *                  example: Branding produk adalah
 *              tambahan:
 *                  type: string
 *                  example: benefit ketika sudah branding
 *              attachment:
 *                  type: file
 *                  example: cover.jpg
 *              video:
 *                  type: string
 *                  example: www.youtube.com/carabranding
 *      errorJudulModulResponse:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  default: Judul Modul sudah ada
 *      createModulResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: CREATED
 *              data:
 *                  type: object
 *                  example:
 *                      id: 1
 *                      judul: Apa itu branding Produk ?
 *                      inti_materi: Branding produk adalah
 *                      tambahan: benefit ketika sudah branding
 *                      gambar: "http://localhost:8080/brandbiz/learning/attachment.jpg"
 *                      video: www.youtube.com/carabranding
 *                      learning_id: 2
 *      deleteModulResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: DELETED
 *              data:
 *                  type: string
 *                  default: Modul telah dihapus
 *      errorNotFoundModulResponse:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  default: Modul tidak ada
 */

const addModulValidation = Joi.object({
    judul: Joi.string().max(100).required(),
    inti_materi: Joi.string().required(),
    tambahan: Joi.string().optional(),
    video: Joi.string().optional(),
})

export default { addModulValidation }