export interface Action {
  type: number | string;
  payload?: string | object | Array<string | object> | boolean | any;
}

export interface AppState {
  readonly user: UserState;
}

export interface UserState {
  readonly isAuth: boolean;
  readonly id?: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatar?: string;
}
