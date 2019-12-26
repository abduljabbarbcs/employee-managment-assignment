import * as React from 'react';
import { ROUTES } from 'utils/navigation';
import { observer } from 'mobx-react-lite';
import { StoreContext } from 'store';
import { TitleBar, SubtitleBar, Content } from 'app/components/page';
import { Title, useDocumentTitle } from 'app/components/Common';
import { Promised } from 'app/components/utils/Promised';
import {remove} from "utils/api-service/department.api";
import {Flex, FlexComponent} from "../../components/Flex";
import {Table} from "reactstrap";
import {Department} from "store/by-data/department-store";
import {TablePagination} from "../employee/EmployeePage";
import {Button, TextButton} from "app/components/form/Button";
import {logAndThrow} from "utils/api-helper";

export const DepartmentPage: React.FC = observer(() => {
    useDocumentTitle(ROUTES['department'].title!);
    const { view } = React.useContext(StoreContext);
    const {content, page, totalPages, nextPage, prevPage, gotoPage,reload} = view.department;
    const removeDepartment = (id) => {
        remove(id).then(()=>{
            reload();
        }).catch(logAndThrow)
    }
    return (
        <>
            <TitleBar>
                <Title>
                    Departments
                </Title>
            </TitleBar>

            <SubtitleBar justify="end">
                <Button text="Add New Departments" onClick={() => view.showAddDepartment()}/>
            </SubtitleBar>

            <Content>
                <Promised by={content}>
                    {([hasNoDepartments, allDepartments]) => (
                        <Flex>
                            {hasNoDepartments ? (<NoResults />) :  <>
                                <DepartmentTable departments={allDepartments} remove={removeDepartment}/>
                                <TablePagination page={page} totalPages={totalPages} prevPage={() => prevPage} nextPage={() => nextPage} gotoPage={gotoPage}/>
                            </>}
                        </Flex>
                    )}
                </Promised>
            </Content>
        </>
    );
});
const NoResults = () => (
    <em>
        No Result Found
    </em>
);
const DepartmentTable: FlexComponent<{departments:Department[], remove:Function}> =({departments,remove}) => {
    return(
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Manager Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {departments.map((department:Department,index:number) =>{
                return (<tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{department.departmentName}</td>
                    <td>{department.manager ? `${department.manager.firstName} ${department.manager.lastName}`:''}</td>
                    <td><TextButton text="Remove" onClick={() => remove(department.id)}/></td>
                </tr>)
            })}
            </tbody>
        </Table>
    )
};

