import { Router } from 'express';
import EmployeeController from '@controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/', EmployeeController.createEmployee);
employeeRouter.get('/', EmployeeController.getEmployee);

export default employeeRouter;
