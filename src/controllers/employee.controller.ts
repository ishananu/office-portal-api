import { Request, Response } from 'express';
import EmployeeService from '@services/employee.service';
import { handlePagination } from '@shared/helpers';
import bcrypt from 'bcryptjs';
import config from '@config/config';
import { IEmployee } from '@models/Employee';
import { IPaginativeQuery } from '@shared/types';

class EmployeeController {
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password ?? 'securepassword',
        Number(config.saltRounds)
      );
      const user = await EmployeeService.createEmployee({
        ...req.body,
        password: hashedPassword
      });

      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error?.message });
    }
  }

  async getEmployee(req: Request): Promise<IPaginativeQuery<IEmployee>> {
    try {
      const users = await EmployeeService.getEmployee(handlePagination(req));
      return users;
    } catch (error) {
      return error;
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
