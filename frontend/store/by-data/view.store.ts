import { observable, computed, action } from 'mobx';
import { ROUTES } from 'utils/navigation';
import path from 'ramda/es/path';
import { matchPaths, getUrl } from '../../utils/router';
import {EmployeesPageStore} from "../by-page/employees-page-store";
import {DepartmentsPageStore} from "../by-page/departments-page-store";
import {AddEmployeePageStore} from "../by-page/add-employee-store";
import {AddDepartmentPageStore} from "../by-page/add-department-store";

export type View =
  | { name: 'loading'; context: Promise<any> }
  | { name: 'employee'; context: EmployeesPageStore }
  | { name: 'department'; context: DepartmentsPageStore }
  | { name: 'add-employee'; context: AddEmployeePageStore }
  | { name: 'add-department'; context: AddDepartmentPageStore }

export class ViewStore {
  @observable current: View;

  constructor() {
        const path = getUrl();
        if (path === ROUTES['/'].path) {
          this.showEmployee();
        } else {
          this.showPath(path);
        }
  }

  @action updateView = (view: View) => {
    const dispose = path<Function>(['context', 'dispose'], this.current);
    if (typeof dispose === 'function') dispose();
    this.current = view;
  };

  @action load = <T extends any>(
    operation: Promise<T>,
    onComplete: (result: T) => void,
  ) => {
    const loading = observable({
      name: 'loading',
      context: operation.then(result => {
        if (this.current === loading) {
          onComplete(result);
        }
      }),
    });
    this.updateView(loading as View);
  };



  @action
  public showEmployee = () => {
    this.updateView({
      name: 'employee',
      context: new EmployeesPageStore(),
    });
  };

    @action
    public showAddEmployee = () => {
        this.updateView({
            name: 'add-employee',
            context: new AddEmployeePageStore(),
        });
    };

    @computed
    get addEmployee(): AddEmployeePageStore {
        if (this.current.name !== 'add-employee')
            throw this.CurrentViewError('employee');
        return this.current.context;
    }

    @action
    public showAddDepartment = () => {
        this.updateView({
            name: 'add-department',
            context: new AddDepartmentPageStore(),
        });
    };

    @computed
    get addDepartment(): AddDepartmentPageStore {
        if (this.current.name !== 'add-department')
            throw this.CurrentViewError('add-department');
        return this.current.context;
    }
  @computed
  get employee(): EmployeesPageStore {
    if (this.current.name !== 'employee')
      throw this.CurrentViewError('employee');
    return this.current.context;
  }

    @action
    public showDepartment= () => {
        this.updateView({
            name: 'department',
            context: new DepartmentsPageStore(),
        });
    };

    @computed
    get department(): DepartmentsPageStore {
        if (this.current.name !== 'department')
            throw this.CurrentViewError('department');
        return this.current.context;
    }


  private CurrentViewError = (accessedView: string) =>
    new Error(
      `Attempting to access ${accessedView}, but current view is ${
        this.current.name
      }`,
    );

  @computed get currentPath(): string {
    const name = this.current.name;
    switch (name) {
      case 'loading':
        return window.location.pathname;
      default:
        return ROUTES[name].path;
    }
  }

  @action showPath = matchPaths([
    [ROUTES['department'].path, () => this.showDepartment()],
    [ROUTES['employee'].path, () => this.showEmployee()],
    [ROUTES['add-employee'].path, () => this.showAddEmployee()],
    [ROUTES['add-department'].path, () => this.showAddDepartment()],
    ['/', () => this.showEmployee()],
  ]);
}
