import Joi from 'joi';

/**
 * @swagger
 * components:
 *  schemas:
 *      createLearningPath:
 *          type: object
 *          required:
 *              - judul
 *          properties:
 *              judul: 
 *                  type: string
 *                  example: Apa itu branding Produk ?
 *              attachment: 
 *                  type: string
 *                  example: attachment.jpg
 *      createLearningPathResponse:
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
 *                      imageUrl: "http://localhost:8080/brandbiz/learning/attachment.jpg"
 *      errorJudulLearningResponse:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  default: Judul Learning path sudah ada
 *      errorNotFoundLearningResponse:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  default: Learning path tidak ada
 *      getLearningPathResponse:
 *          type: object
 *          required:
 *              - status
 *              - data
 *          properties:
 *              status:
 *                  type: string
 *                  default: CREATED
 *              data:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          judul:
 *                              type: string
 *                          imageUrl:
 *                              type: string
 *                      example:
 *                          id: 1
 *                          judul: Apa itu branding Produk ?
 *                          imageUrl: "http://localhost:8080/brandbiz/learning/attachment.jpg"
 *      deleteLearningPathResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  default: DELETED
 *              data:
 *                  type: string
 *                  example: learning path telah dihapus
 *      getLearningPathByResponse:
 *          type: object
 *          required:
 *              - status
 *              - data
 *          properties:
 *              status:
 *                  type: string
 *                  default: CREATED
 *              data:
 *                  type: object
 *                  example:
 *                      id: 1
 *                      judul: Apa itu branding Produk ?
 *                      imageUrl: "http://localhost:8080/brandbiz/learning/attachment.jpg"
 *                      modul: []
 *                      kuis: []
 */

const addLearningValidation = Joi.object({
    judul: Joi.string().max(100).required(),
    imageUrl: Joi.string().optional()
})

const idLearningpath = Joi.number().positive().min(1).required();

export default { addLearningValidation, idLearningpath };
