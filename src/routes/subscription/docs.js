/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *       example:
 *         name: "vm1"
 *         price: 2000
 *
 *   parameters:
 *     idParam:
 *       name: id
 *       in: path
 *       description:  Numberic id of subscription
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *
 *     limitQuery:
 *       name: limit
 *       in: query
 *       description:  amount of data you want to be returned
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *
 *     offsetQuery:
 *       name: offset
 *       in: query
 *       description: from whitch page you want data to be returned
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 0
 *
 *     isActiveQuery:
 *       name: isActive
 *       in: query
 *       description: only return active/deactive customer subscriptions
 *       required: false
 *       schema:
 *         type: boolean
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */

/**
 * @swagger
 * /subscription/add:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Add new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Subscription"
 *             required:
 *               - name

 *     responses:
 *       201:
 *         description: Successful Add
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 id:
 *                   type: number
 *             example:
 *               name: "vm1"
 *               price: 2000
 *               id: 1
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
 * /subscription/{id}:
 *   patch:
 *     tags: [Subscriptions]
 *     summary: update existing subscription
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Subscription"
 *
 *     responses:
 *       200:
 *         description: Successful update
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *       404:
 *         description: subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "subscription not found"
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
 * /subscription/:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all of subscriptions

 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery" 
 *       - $ref: "#/components/parameters/offsetQuery"
 *     responses:
 *       200:
 *         description: Successful 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 name: 
 *                   type: string
 *                 price: 
 *                   type: number
 * 
 *             example:
 *               id: 2
 *               name: "vp1"
 *               price: 12
 *    
 * 
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 * 
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
 * /subscription/buy/{id}:
 *   get:
 *     tags: [CustomerSubscriptions]
 *     summary: Add subscription to a customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful Buy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *             example:
 *               id: 1
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
 *
 *       404:
 *         description: subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "subscription does not exist"
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
 * /subscription/customer:
 *   get:
 *     tags: [CustomerSubscriptions]
 *     summary: Get all of customer's subscription
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *       - $ref: "#/components/parameters/isActiveQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 duration:
 *                   type: string
 *                   summery: last day that subscription must be active for customer
 *                 isActive:
 *                   type: boolean
 *                 price:
 *                   type: number
 *
 *             example:
 *               id: 2
 *               name: "vp1"
 *               createdAt: "1401/12/15 02:51:49"
 *               duration: "1402/01/17 02:51:49"
 *               isActive: true
 *               price: 12
 *
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
 *
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
 * /subscription/{id}/deactive:
 *   patch:
 *     tags: [CustomerSubscriptions]
 *     summary: deactive one of customer's subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: Successful deactivation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "customer subscription successfully deactivated"
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 *
 *       401:
 *         description: Authorization information is missing or invalid.
 *
 *       404:
 *         description: customer subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message:  "customer subscription doesn't exist with this id"
 *
 *       403:
 *         description: customer is not owner of customer acitvation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message:  "you dont access to this data"
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
