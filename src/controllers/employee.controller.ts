import { Request, Response } from 'express';
import EmployeeService from '@services/employee.service';
import { handlePagination } from '@shared/helpers';

class EmployeeController {
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const user = await EmployeeService.createEmployee(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error?.message });
    }
  }

  async getEmployee(req: Request, res: Response): Promise<void> {
    try {
      const users = await EmployeeService.getEmployee(handlePagination(req));
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const users = await EmployeeService.updateEmployee(id, req.body);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const users = await EmployeeService.deleteEmployee(id);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new EmployeeController();
