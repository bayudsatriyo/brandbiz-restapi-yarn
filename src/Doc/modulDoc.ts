/**
 * @swagger
 *  /brandbiz/modul/{idLearningPath}:
 *      post:
 *          summary : create modul and connect to learning Path
 *          tags: [Modul]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref : '#/components/schemas/createModul'
 *          responses:
 *              "200":
 *                  description: Added Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createModulResponse'
 *              "401":
 *                  description: Invalid Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorJudulModulResponse'
 *              "404":
 *                  description: Invalid Learning Id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundLearningResponse'
 * 
 */

/**
 * @swagger
 *  /brandbiz/modul/{idModul}:
 *      delete:
 *          summary : delete modul by Id
 *          tags: [Modul]
 *          responses:
 *              "200":
 *                  description: Deleted Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/deleteModulResponse'
 *              "404":
 *                  description: Not Found Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundModulResponse'
 *      put:
 *          summary : Update Modul by Id
 *          tags : [Modul]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/createModul'
 *          responses:
 *              "200":
 *                  description: Update modul
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createModulResponse'
 *              "404":
 *                  description: NotFound Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundModulResponse'
 */