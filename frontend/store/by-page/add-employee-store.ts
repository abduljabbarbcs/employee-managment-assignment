import {computed} from 'mobx';
import {DepartmentStore} from "../by-data/department-store";
import {EmployeeStore} from "../by-data/employee-store";


export class AddEmployeePageStore {
    readonly employees = new EmployeeStore();
    readonly departments = new DepartmentStore();

    dispose = () => this.employees.dispose();

    @computed get allEmployees() {
        return this.employees.all.current();
    }
    @computed get allDepartments() {
        return this.departments.all.current();
    }
    @computed get content() {
        return Promise.all([this.departments.allDepartments, this.employees.allEmployees]);
    }

}

