import { action, computed } from 'mobx';
import isEmpty from 'ramda/es/isEmpty';
import {EmployeeStore} from "../by-data/employee-store";


export class EmployeesPageStore {
    readonly employees = new EmployeeStore();

    dispose = () => this.employees.dispose();

    @action refresh = () => this.employees.all.refresh();

    @action reload = () => {
        this.employees.all.reset();
        return this.employees.all.current();
    };

    @computed get allEmployees() {
        return this.employees.all.current();
    }

    @computed get hasNoEmployees() {
        return this.allEmployees.then(isEmpty);
    }

    @computed get content() {
        return Promise.all([this.hasNoEmployees, this.employees.allEmployees]);
    }

    @computed get page(){
        return this.employees.pageNumber;
    }

    @computed get totalPages(){
        return this.employees.totalPages;
    }

    @action
    public gotoPage = (pageNumber:number) => {
        this.employees.setPageNumber(pageNumber);
        this.reload();
    }

    @action
    public nextPage = ()=>{
        if(this.page < this.totalPages - 1) {
            this.employees.setPageNumber(this.page + 1)
            this.reload();
        }
    }

    @action
    public prevPage = () => {
        if(this.page > 0) {
            this.employees.setPageNumber(this.page - 1)
            this.reload();
        }
    }
}

