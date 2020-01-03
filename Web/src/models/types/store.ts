import { INotification } from './notification';
import { ProjectsListData } from './project';
import { ITask } from './task';

export interface Action {
  type: number | string;
  payload?: string | object | Array<string | object> | boolean | any;
}

export interface AppState {
  readonly app: ApplicationState;
  readonly user: UserState;
  readonly project: ProjectState;
  readonly sprint: SprintState;
}

export interface UserState {
  readonly isAuth: boolean;
  readonly id?: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatar?: string;
}

export interface ApplicationState {
  readonly sidebarVisible: boolean;
  readonly notifications: INotification[];
}

export interface ProjectState {
  readonly projectList: ProjectsListData[];
  readonly projectListCount: number;
}

export interface SprintState {
  readonly id: string;
  readonly name: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly description: string;
  readonly taskList: ITask[];
}
