import { SERVICES } from 'settings';
import * as request from 'superagent';

const API_URL = SERVICES.api;

/*
 ** Get all employees
 */
export const getAll = (pageNumber:number, pageSize:number) =>
    request.get(`${API_URL}/employee/?page=${pageNumber}&size=${pageSize}`);

//* Get a particular employee.
export const getOne = (employeeId: number) =>
    request
        .get(`${API_URL}/employee/${employeeId}`);

//* Update an employee
export const updateEmployee = (
    employeeId: number,
    payload: any,
) =>
    request
        .put(`${API_URL}/employee/${employeeId}`)
        .send(payload)
        .then(r => r.body);

//* Add a new employee
export const save = (
    payload: any,
) =>
    request
        .post(`${API_URL}/employee`)
        .send(payload);

export const remove = (
    id: number,
) =>
    request
        .delete(`${API_URL}/employee/${id}`);