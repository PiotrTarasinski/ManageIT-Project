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
  home: {
    pathname: '/home',
    params: [],
    component: LoginPage,
    permission: false,
    sidebarVisible: false,
  },
  login: {
    pathname: '/login',
    params: [],
    component: LoginPage,
    permission: false,
    sidebarVisible: false,
  },
  register: {
    pathname: '/register',
    params: [],
    component: RegisterPage,
    permission: false,
    sidebarVisible: false,
  },
  profile: {
    pathname: '/profile',
    params: ['/:id'],
    component: ProfilePage,
    permission: true,
    sidebarVisible: true,
  },
  projects: {
    pathname: '/projects',
    params: [],
    component: ProjectsPage,
    permission: true,
    sidebarVisible: true,
  },
  dashboard: {
    pathname: '/dashboard',
    params: ['/:id'],
    component: DashBoardPage,
    permission: true,
    sidebarVisible: true,
  },
  backlog: {
    pathname: '/backlog',
    params: ['/:id'],
    component: BacklogPage,
    permission: true,
    sidebarVisible: true,
  },
  team: {
    pathname: '/team',
    params: ['/:id'],
    component: TeamPage,
    permission: true,
    sidebarVisible: true,
  },
  sprint: {
    pathname: '/sprint',
    params: ['/:id'],
    component: SprintPage,
    permission: true,
    sidebarVisible: true,
  },
  tasks: {
    pathname: '/tasks',
    params: ['/:id'],
    component: TasksPage,
    permission: true,
    sidebarVisible: true,
  },
  raport: {
    pathname: '/raport',
    params: ['/:id'],
    component: RaportPage,
    permission: true,
    sidebarVisible: true,
  },
};
