export const ROUTES: IRoutes = {
  '/': {
    path: '/',
    title: 'Home',
  },
  employee: {
    path: '/employee',
    title: 'Employee',
    isPublic: true,
  },
  'department': {
    path: '/department',
    title: 'Department',
    isPublic: true,
  },
  'add-employee': {
        path: '/add-employee',
        title: 'Add Employee',
        isPublic: true,
    }, 'add-department': {
        path: '/add-department',
        title: 'Add Department',
        isPublic: true,
    }
};
