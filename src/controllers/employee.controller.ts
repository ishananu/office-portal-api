import { Request, Response } from 'express';
import EmployeeService from '@services/employee.service';
import { EResponseCode } from '@shared/enum';
import { saveEmployeeSchma } from '@shared/validation';

class EmployeeController {
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const validation = saveEmployeeSchma.validate(req.body);
      if (validation.error) {
        throw {
          name: 'Validation error!',
          message: validation.error.details.map((e) => e.message),
          code: EResponseCode.FORBIDDEN
        };
      }
      const user = await EmployeeService.createEmployee(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res
        .status(error?.code ?? 500)
        .json({ success: false, message: error.message });
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
