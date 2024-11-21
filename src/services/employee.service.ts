import Employee, { IEmployee } from 'src/models/Employee';

class EmployeeService {
  async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new Employee(data);
    return await employee.save();
  }

  async getEmployee(): Promise<IEmployee[]> {
    return await Employee.find();
  }
}

export default new EmployeeService();
