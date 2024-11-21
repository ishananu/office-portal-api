import { Router } from 'express';
import EmployeeController from 'src/controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/', EmployeeController.createEmployee);
employeeRouter.get('/', EmployeeController.getEmployee);

export default employeeRouter;
