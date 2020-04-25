import {Action} from '@ngrx/store';

export const SIGNUP = '[Auth] Signup';
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export type AuthActions =
  | Login
  | Logout
  | Signup;

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {
  }
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string,
      id: string,
      token: string,
      expirationDate: Date
    }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: any) {
  }
}
