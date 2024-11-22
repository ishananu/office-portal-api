import { paginateQuery } from '@shared/helpers';
import { IPagination } from '@shared/types';
import Employee, { IEmployee } from 'src/models/Employee';

class EmployeeService {
  async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new Employee(data);
    return await employee.save();
  }

  async getEmployee(pagination: IPagination): Promise<IEmployee[]> {
    return paginateQuery<IEmployee>(Employee, {}, pagination);
  }
}

export default new EmployeeService();
