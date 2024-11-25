import Employee, { IEmployee } from '@models/Employee';
import { paginateQuery } from '@shared/helpers';
import { IPagination } from '@shared/types';

class EmployeeService {
  async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new Employee(data);

    const savedData = await employee.save();
    const objData = savedData.toObject() as { [key: string]: any };
    delete objData.passowrd;
    return savedData;
  }

  async getEmployee(pagination: IPagination): Promise<IEmployee[]> {
    return paginateQuery<IEmployee>(Employee, {}, pagination, { password: 0 });
  }

  async getEmployeeBy(type: 'email' | 'id', val: string): Promise<IEmployee> {
    const selectVal = type === 'email' ? '' : '-password';
    return Employee.findOne({ [type]: val }).select(selectVal);
  }

  async updateEmployee(
    id: string,
    updates: Partial<IEmployee>
  ): Promise<IEmployee | null> {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).select('-password');
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<IEmployee | null> {
    const deletedEmployee = await Employee.findByIdAndDelete(id).select(
      '-password'
    );
    return deletedEmployee;
  }
}

export default new EmployeeService();
