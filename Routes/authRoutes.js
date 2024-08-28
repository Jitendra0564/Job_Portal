import express from 'express';
import { loginController, registerController } from '../Controller/UserController.js';


//router object
const router = express.Router();

//routes


/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: Object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - location
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-genrated id of user collection
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: User email
 *        password:
 *          type: string
 *          description: User password
 *        location:
 *          type: string
 *          description: User location city or country
 *      example:
 *        id: 8383575399379573975
 *        name: Authuser
 *        email: Authuser25@gmail.com
 *        password: 1234567
 *        location: Ahemdabad
 */

// Api Documentation

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new User
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      summary: Login User
 *      tags:
 *        - Auth
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses: 
 *        200:
 *          description: User logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 * 
 *        500:
 *          description: something went wrong
 * 
 *      
 */

router.post('/register',registerController);
router.post('/login',loginController)

export default router;