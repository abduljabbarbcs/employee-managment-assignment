import { action, computed } from 'mobx';
import isEmpty from 'ramda/es/isEmpty';
import {DepartmentStore} from "../by-data/department-store";


export class DepartmentsPageStore {
    readonly departments = new DepartmentStore();

    dispose = () => this.departments.dispose();

    @action refresh = () => this.departments.all.refresh();

    @action reload = () => {
        this.departments.all.reset();
        return this.departments.all.current();
    };

    @computed get allDepartments() {
        return this.departments.all.current();
    }

    @computed get hasNoDepartments() {
        return this.allDepartments.then(isEmpty);
    }

    @computed get content() {
        return Promise.all([this.hasNoDepartments, this.departments.allDepartments]);
    }

    @computed get page(){
        return this.departments.pageNumber;
    }

    @computed get totalPages(){
        return this.departments.totalPages;
    }

    @action
    public gotoPage = (pageNumber:number) => {
        this.departments.setPageNumber(pageNumber);
        this.reload();
    }

    @action
    public nextPage = ()=>{
        if(this.page < this.totalPages - 1) {
            this.departments.setPageNumber(this.page + 1);
            this.reload();
        }
    }

    @action
    public prevPage = () => {
        if(this.page > 0) {
            this.departments.setPageNumber(this.page - 1);
            this.reload();
        }
    }
}

