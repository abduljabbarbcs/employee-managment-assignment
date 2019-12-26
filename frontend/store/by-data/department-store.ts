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
import {getAll, getOne} from "utils/api-service/department.api";
import {Employee} from "./employee-store";
import {filter} from "ramda";

export class Department {
    @observable id: string;
    @observable departmentName: string;
    @observable manager: Employee;
    @observable active: boolean;

    @observable collection?: DepartmentStore;

    disposer = new Disposer();
    dispose = () => this.disposer.dispose();

    static fromId(id: number) {
        return lazyObservablePromise(() =>
            getOne(id)
                .then((json: any) => new Department(json))
                .catch(logAndThrow),
        );
    }

    constructor(json: any, collection?: DepartmentStore) {
        this.setJson(json);
        this.collection = collection;
    }

    @action setJson = ({  ...rest }: any) => {
        set(this, {
            ...rest
        });
    };
}

export class DepartmentStore {
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
            .then(map(department => new Department(department, this)))
            .then(departments => {
                /** Dispose of old departments, add new departments to disposer */
                this.dispose();
                departments.forEach(department => this.disposer.add(department.dispose));
                return departments;
            })
            .catch(logAndThrow),
    );

    @computed get byId(): Promise<Record<string, Department>> {
        const all = this.all.current();
        return new Promise((resolve, reject) =>
            all.then(indexBy(prop('id'))).then(resolve, reject),
        );
    }

    @computed get allDepartments(): IPromiseBasedObservable<Department[]> {

        return fromPromise(
            this.all
                .current()
                .then((department: Department) => department),
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