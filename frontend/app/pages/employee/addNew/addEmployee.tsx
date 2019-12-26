import * as React from 'react';
import {ROUTES} from 'utils/navigation';
import {observer} from 'mobx-react-lite';
import {StoreContext} from 'store';
import {TitleBar, Content} from 'app/components/page';
import {Title, useDocumentTitle} from 'app/components/Common';
import {useState} from "react";
import {Employee} from "store/by-data/employee-store";
import {Department} from "store/by-data/department-store";
import {Button, Input} from "reactstrap";
import {Flex, FlexGap} from "app/components/Flex";
import * as style from "styles";
import {Dropdown} from "../../../components/form/Dropdown";
import {Promised} from "../../../components/utils/Promised";
import {isNil} from "ramda";
import {save} from "../../../../utils/api-service/employee.api";
import {logAndThrow} from "../../../../utils/api-helper";

export const AddNewEmployeePage: React.FC = observer(() => {
    useDocumentTitle(ROUTES['add-employee'].title!);
    const {view} = React.useContext(StoreContext);
    const {content} = view.addEmployee;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [manger, setManager] = useState<Employee>(null);
    const [department, setDepartment] = useState<Department>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDepartmentDropDownOpen, setIsDepartmentDropDownOpen] = useState(false);
    const submit = () => {
        let payload = {};
        payload['firstName'] = firstName;
        payload['lastName'] = lastName;
        payload['phoneNumber'] = phoneNumber;
        payload['email'] = email;
        payload['salary'] = salary;
        if(manger){
            payload['manager'] = {id:manger.id}
        }
        if(department){
            payload['department'] = {id:department.id}
        }
        save(payload).then(() => {
            view.showEmployee()
        }).catch(logAndThrow)
    };
    const cancel = () => {
        view.showEmployee()
    };
    return (
        <>
            <TitleBar>
                <Title>
                    Add New Employee
                </Title>
            </TitleBar>

            <Content>
                <Flex justify="center" align="center">
                    <Input placeholder="First Name" type="text" onChange={(e) => setFirstName(e.currentTarget.value)}
                           css={{margin: '5px', width: '25%'}}/>
                    <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.currentTarget.value)}
                           css={{margin: '5px', width: '25%'}}/>
                    <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.currentTarget.value)}
                           css={{margin: '5px', width: '25%'}}/>
                    <Input placeholder="Phone Number" type="text" onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                           css={{margin: '5px', width: '25%'}}/>
                    <Input placeholder="Salary" min={1} type="number" step="1"
                           onChange={(e) => setSalary(e.currentTarget.value)} css={{margin: '5px', width: '25%'}}/>
                    <Promised by={content}>
                        {([allDepartments, allEmployees]) => (
                            <Dropdown
                                isOpen={isOpen}
                                currentSelection={manger ? `${manger.firstName} ${manger.lastName}` : ''}
                                toggle={() => setIsOpen(!isOpen)} css={{margin: '5px', width: '25%'}}>

                                {allEmployees.map((employee, key) => (<li
                                        css={{textTransform: 'capitalize'}}
                                        key={isNil(key) ? 'default' : key.toString()}
                                        onClick={() => setManager(employee)}>
                                        {`${employee.firstName} ${employee.lastName}`}
                                    </li>)
                                )
                                }

                            </Dropdown>
                        )}
                    </Promised>
                    <Promised by={content}>
                        {([allDepartments]) => (
                            <Dropdown
                                isOpen={isDepartmentDropDownOpen}
                                currentSelection={department ? department.departmentName : ''}
                                toggle={() => setIsDepartmentDropDownOpen(!isDepartmentDropDownOpen)}
                                css={{margin: '5px', width: '25%'}}>

                                {
                                    allDepartments.map((department, key) => (<li
                                            css={{textTransform: 'capitalize'}}
                                            key={isNil(key) ? 'default' : key.toString()}
                                            onClick={() => setDepartment(department)}>
                                            {department.departmentName}
                                        </li>)
                                    )
                                }

                            </Dropdown>
                        )}
                    </Promised>
                    <FlexGap justify="end" align="end" spacing={style.constants.form.loginSpacing}
                             css={{width: '25%', padding: '20px 0px'}} row>
                        <Button css={{width: '100px'}} onClick={cancel}>Cancel</Button>
                        <Button color="success" css={{width: '100px'}} onClick={submit}>Submit</Button>
                    </FlexGap>
                </Flex>

            </Content>
        </>
    );
});