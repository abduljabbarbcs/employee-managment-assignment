import * as React from 'react';
import {ROUTES} from 'utils/navigation';
import {observer} from 'mobx-react-lite';
import {StoreContext} from 'store';
import {TitleBar, Content} from 'app/components/page';
import {Title, useDocumentTitle} from 'app/components/Common';
import {useState} from "react";
import {Employee} from "store/by-data/employee-store";
import {Button, Input} from "reactstrap";
import {Flex, FlexGap} from "app/components/Flex";
import * as style from "styles";
import {Dropdown} from "../../../components/form/Dropdown";
import {Promised} from "../../../components/utils/Promised";
import {isNil} from "ramda";
import {save} from "../../../../utils/api-service/department.api";
import {logAndThrow} from "../../../../utils/api-helper";

export const AddNewDepartmentPage: React.FC = observer(() => {
    useDocumentTitle(ROUTES['add-department'].title!);
    const {view} = React.useContext(StoreContext);
    const {content} = view.addDepartment;
    const [departmentName, setDepartmentName] = useState('')

    const [manger, setManager] = useState<Employee>(null);
    const [isOpen, setIsOpen] = useState(false);
    const submit = () => {
        let payload = {};
        payload['departmentName'] = departmentName;
        if(manger){
            payload['manager'] = {id:manger.id}
        }
        save(payload).then(() => {
            view.showDepartment()
        }).catch(logAndThrow)
    };
    const cancel = () => {
        view.showDepartment()
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
                    <Input placeholder="Department Name" type="text" onChange={(e) => setDepartmentName(e.currentTarget.value)}
                           css={{margin: '5px', width: '25%'}}/>
                    <Promised by={content}>
                        {([allEmployees]) => (
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