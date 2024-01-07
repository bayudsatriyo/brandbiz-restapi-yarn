/**
 * @swagger
 *  /brandbiz/learning:
 *      post:
 *          summary : Crete Learning Path
 *          tags: [Learning]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref : '#/components/schemas/createLearningPath'
 *          responses:
 *              "200":
 *                  description: Added Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createLearningPathResponse'
 *              "401":
 *                  description: Invalid Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorJudulLearningResponse'
 *      get:
 *          summary : Get All Learning Path
 *          tags: [Learning]
 *          responses:
 *              "200":
 *                  description: Getting All Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/getLearningPathResponse'
 */

/**
 * @swagger
 *  /brandbiz/learning/{idLearningPath}:
 *      delete:
 *          summary : Delete Learning Path By Id
 *          tags: [Learning]
 *          responses:
 *              "200":
 *                  description: Getting All Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/deleteLearningPathResponse'
 *              "404":
 *                  description: Not Found Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundLearningResponse'
 *      get:
 *          summary : Get Learning Path By Id
 *          tags: [Learning]
 *          responses:
 *              "200":
 *                  description: Getting All Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/getLearningPathByResponse'
 *              "404":
 *                  description: Not Found Learning Path
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundLearningResponse'
 */