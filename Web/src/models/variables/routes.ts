import { IRouteObj } from 'models/types/route';
import HomePage from 'pages/home/HomePage';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import ProfilePage from 'pages/profile/ProfilePage';
import ProjectsPage from 'pages/projects/ProjectsPage';
import DashBoardPage from 'pages/dashboard/DashBoardPage';
import TeamPage from 'pages/team/TeamPage';
import BacklogPage from 'pages/backlog/BacklogPage';
import SprintPage from 'pages/sprint/SprintPage';
import TasksPage from 'pages/tasks/TasksPage';
import RaportPage from 'pages/raport/RaportPage';

export const ROUTES: IRouteObj = {
  home: { pathname: '/home', component: HomePage, permission: false, sidebarVisible: false },
  login: { pathname: '/login', component: LoginPage, permission: false, sidebarVisible: false },
  register: {
    pathname: '/register',
    component: RegisterPage,
    permission: false,
    sidebarVisible: false,
  },
  profile: { pathname: '/profile', component: ProfilePage, permission: true, sidebarVisible: true },
  projects: {
    pathname: '/projects',
    component: ProjectsPage,
    permission: true,
    sidebarVisible: true,
  },
  dashboard: {
    pathname: '/dashboard',
    component: DashBoardPage,
    permission: true,
    sidebarVisible: true,
  },
  backlog: { pathname: '/backlog', component: BacklogPage, permission: true, sidebarVisible: true },
  team: { pathname: '/team', component: TeamPage, permission: true, sidebarVisible: true },
  sprint: { pathname: '/sprint', component: SprintPage, permission: true, sidebarVisible: true },
  tasks: { pathname: '/tasks', component: TasksPage, permission: true, sidebarVisible: true },
  raport: { pathname: '/raport', component: RaportPage, permission: true, sidebarVisible: true },
};
