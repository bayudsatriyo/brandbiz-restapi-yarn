/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users Routes
 */

/**
 * tags:
 *   name: Learning
 *   description: The Learning Path
 */

/**
 * @swagger
 *  /public/users:
 *      post:
 *          summary : Registration User
 *          tags: [Users]
 *          requestBody:
 *          required: true
 *          content:
 *              application/json:
 *          schema:
 *              $ref : '#/components/schemas/addUsersValidation'
 *          responses:
 *              "200":
 *                  description: Add User
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/addUsersResponse'
 *              "401":
 *                  description: Invalid Regist
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserHasBeenAdd'
 */             

/**
 * @swagger
 *  /public/authentication:
 *      post:
 *          summary : Authentication User
 *          tags: [Users]
 *          requestBody:
 *          required: true
 *          content:
 *              application/json:
 *          schema:
 *              $ref : '#/components/schemas/addUsersValidation'
 *          responses:
 *              "200":
 *                  description: Auth User
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/authentication'
 *              "401":
 *                  description: Invalid Auth
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ErrorAuth'
 */

/**
 * @swagger
 *  /brandbiz/user:
 *    get:
 *      summary : Get User by Token
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      responses:
 *        "200":
 *          description: SUCCESS
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GetUserByIdResponse'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 *    put:
 *      summary : Update User by Token
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUsersValidation'
 *      responses:
 *        "200":
 *          description: Update User data
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUserByIdResponse'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 *    delete:
 *      summary : Logout User by Token
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      responses:
 *        "200":
 *          description: Update User data
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LogoutResponse'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 */

/**
 * @swagger
 *  /brandbiz/feedback:
 *    post:
 *      summary : user add feedback
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/feedback'
 *      responses:
 *        "200":
 *          description: SUCCESS
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/feedbackresponse'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 */

/**
 * @swagger
 *  /brandbiz/user/{idLearningPath}:
 *    get:
 *      summary : User get Learning Path
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      responses:
 *        "200":
 *          description: SUCCESS
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/usergetlearning'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 *        "403":
 *          description: Learning has Get
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/learningHasGated'
 *        "404":
 *          description: Learning Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/learningNotFound'
 */

/**
 * @swagger
 *  /brandbiz/user/learning/{idLearningPath}/skor/{skor}:
 *    get:
 *      summary : User get Skor in Learning Path
 *      tags : [Users]
 *      parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *           type: string
 *           required: true
 *           description: A token string
 *      responses:
 *        "200":
 *          description: SUCCESS
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/usergetSkorlearning'
 *        "401":
 *          description: Unauthorization User
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedResponse'
 *        "404":
 *          description:  Learning Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/learningNotFound'
 */