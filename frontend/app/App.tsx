import { hot } from 'react-hot-loader/root';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ReactNotifyToast from 'react-notify-toast';
import { StoreContext } from 'store';
import { SidebarLayout } from './components/page/layout';
import departmentsImg from 'assets/icons/departments.png';
import EmployeeImg from 'assets/icons/employees.png';
import { ViewStore } from 'store/by-data/view.store';
import { Flex } from './components/Flex';
import { ROUTEMAP } from 'utils/route-map';

export const App: React.FC = hot(
  observer(() => {
    const { view } = useContext(StoreContext);

    /**
     * If we have a stored token, let's wait to render UI until the auth check has passed.
     * This way, if auth succeeds, we avoid briefly flashing the login UI.
     */
    const CurrentView = ROUTEMAP[view.current.name];

    return (
      <Flex css={{ height: '100vh' }}>
          <SidebarLayout menus={createMenus(view)}>
            <CurrentView />
          </SidebarLayout>
        <Notifications />
      </Flex>
    );
  }),
);

/**
 * ReactNotifyToast is using deprecated React APIs as of 16.9 and is printing warnings to console.
 */
const Notifications = () => (
  <ReactNotifyToast options={{ zIndex: 1060 /** above ReactModal */ }} />
);


const createMenus = (view: ViewStore) => [
  // main menu items
  {
    menuItems: [
      {
        icon: EmployeeImg,
        isActive: () => view.current.name === 'employee',
        tooltip: "Employees",
        action: () => view.showEmployee(),
        expandedContent: () => (
          <Flex>
              Employees
          </Flex>
        ),
        testId: 'sidebar-employees-nav-btn',
      },
      {
        icon: departmentsImg,
        isActive: () => view.current.name === 'department',
        tooltip:"Departments",
        action: () => view.showDepartment(),
        expandedContent: () => (
          <Flex>
              Departments
          </Flex>
        ),
        testId: 'sidebar-departments-nav-btn',
      },
    ],
  }
];
