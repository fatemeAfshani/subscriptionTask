/**
 * @swagger
 * /invoice/:
 *   get:
 *     tags: [Invoices]
 *     summary: Get all of customer invoices
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/limitQuery"
 *       - $ref: "#/components/parameters/offsetQuery"
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCredit:
 *                   type: number
 *                 invoices:
 *                   type: array
 *                   properties:
 *                     id:
 *                       type: number
 *                     startDate:
 *                       type: string
 *                     endDate:
 *                       type: string
 *                     price:
 *                       type: number
 *                     customerSubscriptionId:
 *                       type: number
 *
 *             example:
 *              userCredit: -299995
 *              invoices:
 *                   id: 331
 *                   startDate": "1401/12/15 03:41:49"
 *                   endDate": "1401/12/15 03:51:49"
 *                   price": 20001
 *                   customerSubscriptionId": 13
 *                   name": "vm55"
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
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 */

/**
 * @swagger
 * /invoice/{id}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get all invoices of one customer's subscription
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
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
 *                 userCredit:
 *                   type: number
 *                 invoices:
 *                   type: array
 *                   properties:
 *                     id:
 *                       type: number
 *                     startDate:
 *                       type: string
 *                     endDate:
 *                       type: string
 *                     price:
 *                       type: number
 *                     customerSubscriptionId:
 *                       type: number
 *
 *             example:
 *              userCredit: -299995
 *              invoices:
 *                   id: 331
 *                   startDate": "1401/12/15 03:41:49"
 *                   endDate": "1401/12/15 03:51:49"
 *                   price": 20001
 *                   customerSubscriptionId": 13
 *                   name": "vm55"
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
 *         description: customer subscription doesn't exist with this id
 *
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GeneralError"
 *
 */
