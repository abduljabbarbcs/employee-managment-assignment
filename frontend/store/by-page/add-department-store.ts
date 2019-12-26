import {computed} from 'mobx';
import {EmployeeStore} from "../by-data/employee-store";


export class AddDepartmentPageStore {
    readonly employees = new EmployeeStore();

    dispose = () => this.employees.dispose();

    @computed get allEmployees() {
        return this.employees.all.current();
    }

    @computed get content() {
        return Promise.all([this.employees.allEmployees]);
    }

}

