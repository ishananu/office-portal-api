import request from 'supertest';
import { Request, Response } from 'express';
import EmployeeController from '../../src/controllers/employee.controller';
import EmployeeService from '../../src/services/employee.service';

jest.mock('@services/employee.service'); // Mock the EmployeeService

describe('EmployeeController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { body: {}, params: {}, query: {} };
    res = { status: statusMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should create a new employee and return 201 status', async () => {
      const mockEmployee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      };
      (EmployeeService.createEmployee as jest.Mock).mockResolvedValue(
        mockEmployee
      );

      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password'
      };

      await EmployeeController.createEmployee(req as Request, res as Response);

      expect(EmployeeService.createEmployee).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockEmployee
      });
    });

    it('should return 500 on service failure', async () => {
      const mockError = new Error('Database Error');
      (EmployeeService.createEmployee as jest.Mock).mockRejectedValue(
        mockError
      );

      await EmployeeController.createEmployee(req as Request, res as Response);

      expect(EmployeeService.createEmployee).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });

  describe('getEmployee', () => {
    it('should return a list of employees', async () => {
      const mockEmployees = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
      ];
      (EmployeeService.getEmployee as jest.Mock).mockResolvedValue(
        mockEmployees
      );

      req.query = { p: '1', s: '20' };

      await EmployeeController.getEmployee(req as Request, res as Response);

      expect(EmployeeService.getEmployee).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockEmployees
      });
    });

    it('should return 500 on service failure', async () => {
      const mockError = new Error('Error fetching employees');
      (EmployeeService.getEmployee as jest.Mock).mockRejectedValue(mockError);

      await EmployeeController.getEmployee(req as Request, res as Response);

      expect(EmployeeService.getEmployee).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });

  describe('updateEmployee', () => {
    it('should update an employee and return 200 status', async () => {
      const mockUpdatedEmployee = { id: '1', name: 'Updated Name' };
      (EmployeeService.updateEmployee as jest.Mock).mockResolvedValue(
        mockUpdatedEmployee
      );

      req.params = { id: '1' };
      req.body = { name: 'Updated Name' };

      await EmployeeController.updateEmployee(req as Request, res as Response);

      expect(EmployeeService.updateEmployee).toHaveBeenCalledWith(
        '1',
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockUpdatedEmployee
      });
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee and return 200 status', async () => {
      (EmployeeService.deleteEmployee as jest.Mock).mockResolvedValue({
        success: true
      });

      req.params = { id: '1' };

      await EmployeeController.deleteEmployee(req as Request, res as Response);

      expect(EmployeeService.deleteEmployee).toHaveBeenCalledWith('1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: { success: true }
      });
    });
  });
});
