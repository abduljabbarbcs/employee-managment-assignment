import { SERVICES } from 'settings';
import * as request from 'superagent';

const API_URL = SERVICES.api;

/*
 ** Get all department
 */
export const getAll = (pageNumber:number, pageSize:number) =>
    request.get(`${API_URL}/department/?page=${pageNumber}&size=${pageSize}`);

//* Get a particular department.
export const getOne = (employeeId: number) =>
    request
        .get(`${API_URL}/department/${employeeId}`);

//* Update a department
export const updateEmployee = (
    employeeId: number,
    payload: any,
) =>
    request
        .put(`${API_URL}/department/${employeeId}`)
        .send(payload)
        .then(r => r.body);

//* Add a new department
export const save = (
    payload: any,
) =>
    request
        .post(`${API_URL}/department`)
        .send(payload);

export const remove = (
    id: number,
) =>
    request
        .delete(`${API_URL}/department/${id}`);
