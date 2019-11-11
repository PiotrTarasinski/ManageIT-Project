export interface Action {
  type: number | string;
  payload?: string | object | Array<string | object> | boolean | any;
}

export interface AppState {
  readonly app: ApplicationState;
  readonly user: UserState;
}

export interface UserState {
  readonly isAuth: boolean;
  readonly token?: string;
  readonly id?: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatar?: string;
}

export interface ApplicationState {
  readonly sidebarVisible: boolean;
}
