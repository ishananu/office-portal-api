import { Request, Response } from 'express';
import EmployeeService from 'src/services/employee.service';

class EmployeeController {
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const user = await EmployeeService.createEmployee(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getEmployee(_req: Request, res: Response): Promise<void> {
    try {
      const users = await EmployeeService.getEmployee();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new EmployeeController();
