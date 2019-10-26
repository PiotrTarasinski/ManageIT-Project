export interface ILoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
