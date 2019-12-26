import { observable, computed, action, set } from 'mobx';
import indexBy from 'ramda/es/indexBy';
import prop from 'ramda/es/prop';
import { logAndThrow } from 'utils/api-helper';
import {
    lazyObservablePromise,
} from 'utils/observablePromise';
import map from 'ramda/es/map';
import { Disposer } from 'utils/disposer';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import {getAll, getOne} from "utils/api-service/employee.api";
import {Department} from "./department-store";
import {filter} from "ramda";

export class Employee {
    @observable id: string;
    @observable firstName: string;
    @observable lastName: string;
    @observable phoneNumber: string;
    @observable salary: number;
    @observable email: string;
    @observable manager: Employee;
    @observable department: Department;
    @observable active: boolean;

    @observable collection?: EmployeeStore;

    disposer = new Disposer();
    dispose = () => this.disposer.dispose();

    static fromId(id: number) {
        return lazyObservablePromise(() =>
            getOne(id)
                .then((json: any) => new Employee(json))
                .catch(logAndThrow),
        );
    }

    constructor(json: any, collection?: EmployeeStore) {
        this.setJson(json);
        this.collection = collection;
    }

    @action setJson = ({  ...rest }: any) => {
        set(this, {
            ...rest
        });
    };
}

export class EmployeeStore {
    disposer = new Disposer();
    dispose = () => this.disposer.dispose();

    /**
     * All fetched models.
     */
    @observable all = lazyObservablePromise(() =>
        getAll(this.pageNumber,10)
            .then((res) => {
                this.setTotalPages(res['body']['totalPages'])
                return  res['body']['content']
            })
            .then(filter((employee) => employee['active']))
            .then(map(employee => new Employee(employee, this)))
            .then(employees => {
                /** Dispose of old employees, add new employees to disposer */
                this.dispose();
                employees.forEach(employee => this.disposer.add(employee.dispose));
                return employees;
            })
            .catch(logAndThrow),
    );

    @computed get byId(): Promise<Record<string, Employee>> {
        const all = this.all.current();
        return new Promise((resolve, reject) =>
            all.then(indexBy(prop('id'))).then(resolve, reject),
        );
    }

    @computed get allEmployees(): IPromiseBasedObservable<Employee[]> {

        return fromPromise(
            this.all
                .current()
                .then((employee: Employee) => employee),
        );
    }

    @observable pageNumber:number = 0;

    @action
    public setPageNumber = (pageNumber:number) => {
        this.pageNumber = pageNumber;
    }

    @observable totalPages:number;
    @action
    public setTotalPages =  (total:number) => {
        this.totalPages = total;
    }

}