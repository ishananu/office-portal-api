import { Router } from 'express';
import EmployeeController from '@controllers/employee.controller';
import validateReq from '@middleware/validateReq';
import { saveEmployeeSchma } from '@shared/validation';

const employeeRouter = Router();

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee.
 *     description: Create a new employee by providing a name, email, and password.
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the employee.
 *                 example: "Ishan Anuradha"
 *               email:
 *                 type: string
 *                 description: The email of the employee.
 *                 example: "ishan@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the employee.
 *                 example: "securepassword"
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Retrieve all employees.
 *     description: Retrieve a list of all employees.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the employee.
 *                   email:
 *                     type: string
 *                     description: The email of the employee.
 *                   password:
 *                     type: string
 *                     description: The password of the employee.
 *       500:
 *         description: Internal server error.
 */

employeeRouter.post(
  '/',
  validateReq(saveEmployeeSchma),
  EmployeeController.createEmployee
);
employeeRouter.get('/', EmployeeController.getEmployee);

export default employeeRouter;
