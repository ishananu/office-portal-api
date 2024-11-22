import Employee, { IEmployee } from '@models/Employee';
import { paginateQuery } from '@shared/helpers';
import { IPagination } from '@shared/types';

class EmployeeService {
  async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new Employee(data);
    return await employee.save();
  }

  async getEmployee(pagination: IPagination): Promise<IEmployee[]> {
    return paginateQuery<IEmployee>(Employee, {}, pagination, { password: 0 });
  }
}

export default new EmployeeService();
