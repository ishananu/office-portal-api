import { Router } from 'express';
import EmployeeController from '@controllers/employee.controller';
import validateReq from '@middleware/validateReq';
import { saveEmployeeSchma } from '@shared/validation';
import { userRequired } from '@middleware/authenticate';
import asyncMiddleware from '@middleware/async';

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
 *           examples:
 *             employee:
 *               value:
 *                 name: "John Doe"
 *                 email: "johndoe@example.com"
 *                 password: "password123"
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Retrieve all employees with pagination.
 *     description: Retrieve a list of all employees with optional pagination parameters `p` (page) and `s` (size).
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: p
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: s
 *         schema:
 *           type: integer
 *           example: 20
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of employees with pagination.
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
 *
 *   put:
 *     summary: Update an existing employee.
 *     description: Update an employee by providing their ID and the fields to be updated.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee to update.
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
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 description: The email of the employee.
 *                 example: "updatedemail@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the employee.
 *                 example: "updatedpassword123"
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *       400:
 *         description: Invalid input or employee not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete an employee by ID.
 *     description: Delete an employee by their ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee to delete.
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *       400:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */

employeeRouter.post(
  '/',
  validateReq(saveEmployeeSchma),
  EmployeeController.createEmployee
);

employeeRouter.get(
  '/',
  userRequired,
  asyncMiddleware(EmployeeController.getEmployee)
);

employeeRouter.put('/:id', EmployeeController.updateEmployee);

employeeRouter.delete('/:id', EmployeeController.deleteEmployee);

export default employeeRouter;
