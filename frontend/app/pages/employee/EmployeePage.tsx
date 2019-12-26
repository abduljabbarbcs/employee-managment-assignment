import * as React from 'react';
import { ROUTES } from 'utils/navigation';
import { observer } from 'mobx-react-lite';
import { StoreContext } from 'store';
import { TitleBar, SubtitleBar, Content } from 'app/components/page';
import { Title, useDocumentTitle } from 'app/components/Common';
import { Promised } from 'app/components/utils/Promised';
import {Flex, FlexComponent} from "app/components/Flex";
import {Pagination, PaginationItem, PaginationLink, Table} from "reactstrap";
import {Employee} from "store/by-data/employee-store";
import {Button, TextButton} from "../../components/form/Button";
import {remove} from "../../../utils/api-service/employee.api";
import {logAndThrow} from "../../../utils/api-helper";

export const EmployeePage: React.FC = observer(() => {
    useDocumentTitle(ROUTES['employee'].title!);
    const { view } = React.useContext(StoreContext);
    const {content, page, totalPages, nextPage,prevPage,gotoPage, reload} = view.employee;
    const removeEmployee= (id) => {
        remove(id).then(()=>{
            reload();
        }).catch(logAndThrow)
    }
    return (
        <>
            <TitleBar>
                <Title>
                   Employees
                </Title>
            </TitleBar>

            <SubtitleBar justify="end">
               <Button text="Add New Employee" onClick={() => view.showAddEmployee()}/>
            </SubtitleBar>

            <Content>
                <Promised by={content}>
                    {([hasNoEmployees, allEmployees]) => (
                        <Flex>
                            {hasNoEmployees ? (<NoResults />) : (
                                <>
                                <EmployeeTable employees={allEmployees} remove={removeEmployee}/>
                                <TablePagination page={page} totalPages={totalPages} prevPage={()=>prevPage} nextPage={() => nextPage} gotoPage={gotoPage}/>
                                </>
                            )
                            }
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
const EmployeeTable: FlexComponent<{employees:Employee[]; remove:Function}> = observer(({employees, remove}) => {
    return(
        <Table striped>
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Manager</th>
                <th>Department</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((employee:Employee,index:number) =>{
                return (<tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.email}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.manager ? `${employee.manager.firstName} ${employee.manager.lastName}`:''}</td>
                    <td>{employee.department ? employee.department.departmentName:''}</td>
                    <td><TextButton text="Remove" onClick={() => remove(employee.id)}/></td>
                </tr>)
            })}
            </tbody>
        </Table>
    )
});

export const TablePagination: React.FC<{page:number; totalPages:number,gotoPage:Function,nextPage:()=>{}, prevPage:()=>{}}> = ({page, totalPages, nextPage, prevPage, gotoPage}) => {
    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink first onClick={() => gotoPage(0)}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous onClick={prevPage} />
            </PaginationItem>
            {[...Array(totalPages)].map((e, i) => {
                return page === i ? <PaginationItem active key={i} onClick={() => gotoPage(i)}>
                    <PaginationLink >
                        {i+1}
                    </PaginationLink>
                </PaginationItem>:
                    <PaginationItem key={i} onClick={() => gotoPage(i)}>
                        <PaginationLink>
                            {i+1}
                        </PaginationLink>
                    </PaginationItem>
            })}

            <PaginationItem>
                <PaginationLink next onClick={nextPage}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={() => gotoPage(totalPages - 1)}/>
            </PaginationItem>
        </Pagination>
    );
}

