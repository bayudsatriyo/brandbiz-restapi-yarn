/**
 * @swagger
 *  /brandbiz/kuis:
 *      post:
 *          summary : create kuis and connect to learning Path
 *          tags: [Kuis]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/createKuis'
 *          responses:
 *              "200":
 *                  description: Added Kuis
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createKuisResponse'
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
 *  /brandbiz/kuis/{idKuis}:
 *      delete:
 *          summary : delete kuis by Id
 *          tags: [Kuis]
 *          responses:
 *              "200":
 *                  description: Deleted Kuis
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/deleteKuisResponse'
 *              "404":
 *                  description: Not Found Kuis
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundKuisResponse'
 *      put:
 *          summary : Update Kuis by Id
 *          tags : [Kuis]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateKuis'
 *          responses:
 *              "200":
 *                  description: Update modul
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/updateKuisResponse'
 *              "404":
 *                  description: NotFound Modul
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorNotFoundKuisResponse'
 */