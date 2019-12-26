import React from 'react';
import { View } from 'store/by-data/view.store';
import { Spinner } from 'app/components/Spinner';
import {EmployeePage} from "../app/pages/employee/EmployeePage";
import {DepartmentPage} from "../app/pages/department/DepartmentPage";
import {AddNewEmployeePage} from "../app/pages/employee/addNew/addEmployee";
import {AddNewDepartmentPage} from "../app/pages/department/addDepartment/addDepartmentPage";

export const ROUTEMAP: Record<View['name'], React.ElementType> = {
  loading: () => <Spinner grow />,
  employee: EmployeePage,
  department: DepartmentPage,
  'add-employee':AddNewEmployeePage,
  'add-department':AddNewDepartmentPage
};
