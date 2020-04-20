import {Action} from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthActions =
  | Login
  | Logout
  | Signup;

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
