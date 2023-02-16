export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register'},
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component:'./Admin',
    routes: [
      // { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { name: '用户管理', path: '/admin/user-manage', component: './Admin/UserManage'},
      { component: './404' },
    ],
  },
  { icon: 'smile', name: '分析页', path: '/dashboardanalysis', component: './DashboardAnalysis' },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
