/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: error happened
 *
 */

/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Customer Related Apis
 *   - name: Subscriptions
 *     description: Subscription Related Apis
 *   - name: CustomerSubscriptions
 *     description: CustomerSubscriptions Related Apis
 *   - name: Invoices
 *     description: Invoice Related Apis
 */

/**
 * @swagger
 * /customer/register:
 *   post:
 *     tags: [Customers]
 *     summary: Returns username and credit
 *     description: Customer registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 3 character
 *               credit:
 *                 type: number
 *                 description: initial customer credit
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123"
 *             credit: 20
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 credit:
 *                   type: number
 *             example:
 *               username: "fateme"
 *               credit: 20
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */

/**
 * @swagger
 * /customer/login:
 *   post:
 *     tags: [Customers]
 *     summary: Returns username and token
 *     description: Customer login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password must be min 3 character
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "fateme"
 *             password: "123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               username: "fateme"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       401:
 *         description: Authorization information is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "invalid login"
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
