import EmployeeService from '../../src/services/employee.service';
import Employee from '../../src/models/Employee';
import { IPagination } from '../../src/shared/types';

jest.mock('@models/Employee'); // Mock the Employee model

describe('EmployeeService', () => {
  describe('createEmployee', () => {
    it('should create a new employee and return it', async () => {
      const mockEmployee = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password'
      };
      const saveMock = jest.fn().mockResolvedValue(mockEmployee);
      Employee.prototype.save = saveMock;

      const result = await EmployeeService.createEmployee(mockEmployee);

      expect(saveMock).toHaveBeenCalledWith(mockEmployee);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw an error if there is a problem saving the employee', async () => {
      const mockError = new Error('Database error');
      const saveMock = jest.fn().mockRejectedValue(mockError);
      Employee.prototype.save = saveMock;

      const result = EmployeeService.createEmployee({ name: 'John Doe' });
      await expect(result).rejects.toThrowError('Database error');
    });
  });

  describe('getEmployee', () => {
    it('should return a list of employees based on pagination', async () => {
      const mockPagination: IPagination = { skip: 1, limit: 10 };
      const mockEmployees = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' }
      ];

      const paginateQueryMock = jest.fn().mockResolvedValue(mockEmployees);
      (require('@shared/helpers').paginateQuery as jest.Mock) =
        paginateQueryMock;

      const result = await EmployeeService.getEmployee(mockPagination);

      expect(paginateQueryMock).toHaveBeenCalledWith(
        Employee,
        {},
        mockPagination,
        { password: 0 }
      );
      expect(result).toEqual(mockEmployees);
    });

    it('should throw an error if pagination fails', async () => {
      const mockPagination: IPagination = { skip: 1, limit: 10 };
      const mockError = new Error('Error with pagination');

      const paginateQueryMock = jest.fn().mockRejectedValue(mockError);
      (require('@shared/helpers').paginateQuery as jest.Mock) =
        paginateQueryMock;

      await expect(
        EmployeeService.getEmployee(mockPagination)
      ).rejects.toThrowError('Error with pagination');
    });
  });

  describe('updateEmployee', () => {
    it('should update the employee and return the updated data', async () => {
      const mockUpdatedEmployee = {
        name: 'John Updated',
        email: 'john_updated@example.com'
      };
      const mockId = '123';
      const mockUpdates = { name: 'John Updated' };

      const findByIdAndUpdateMock = jest
        .fn()
        .mockResolvedValue(mockUpdatedEmployee);
      Employee.findByIdAndUpdate = findByIdAndUpdateMock;

      const result = await EmployeeService.updateEmployee(mockId, mockUpdates);

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(mockId, mockUpdates, {
        new: true,
        runValidators: true
      });
      expect(result).toEqual(mockUpdatedEmployee);
    });

    it('should return null if the employee was not found', async () => {
      const mockId = '123';
      const mockUpdates = { name: 'John Updated' };

      const findByIdAndUpdateMock = jest.fn().mockResolvedValue(null);
      Employee.findByIdAndUpdate = findByIdAndUpdateMock;

      const result = await EmployeeService.updateEmployee(mockId, mockUpdates);

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(mockId, mockUpdates, {
        new: true,
        runValidators: true
      });
      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const mockError = new Error('Database error');
      const findByIdAndUpdateMock = jest.fn().mockRejectedValue(mockError);
      Employee.findByIdAndUpdate = findByIdAndUpdateMock;

      const result = EmployeeService.updateEmployee('123', {
        name: 'Updated Name'
      });
      await expect(result).rejects.toThrowError('Database error');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete the employee and return the deleted data', async () => {
      const mockDeletedEmployee = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      const mockId = '123';

      const findByIdAndDeleteMock = jest
        .fn()
        .mockResolvedValue(mockDeletedEmployee);
      Employee.findByIdAndDelete = findByIdAndDeleteMock;

      const result = await EmployeeService.deleteEmployee(mockId);

      expect(findByIdAndDeleteMock).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockDeletedEmployee);
    });

    it('should return null if the employee was not found', async () => {
      const mockId = '123';

      const findByIdAndDeleteMock = jest.fn().mockResolvedValue(null);
      Employee.findByIdAndDelete = findByIdAndDeleteMock;

      const result = await EmployeeService.deleteEmployee(mockId);

      expect(findByIdAndDeleteMock).toHaveBeenCalledWith(mockId);
      expect(result).toBeNull();
    });

    it('should throw an error if deletion fails', async () => {
      const mockError = new Error('Database error');
      const findByIdAndDeleteMock = jest.fn().mockRejectedValue(mockError);
      Employee.findByIdAndDelete = findByIdAndDeleteMock;

      const result = EmployeeService.deleteEmployee('123');
      await expect(result).rejects.toThrowError('Database error');
    });
  });
});
