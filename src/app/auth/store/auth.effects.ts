import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {environment} from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../services/auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + Number(resData.expiresIn) * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate
  });
};

const handleError = errorResponse => {
  let errorMessage = 'An unknown error occurred!';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }

  switch (errorResponse.error.error.message) {
    // Signup error messages
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account!';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project!';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';
      break;
    // Login error messages
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid or the user does not have a password!';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator!';
      break;
  }
  return of(new AuthActions.AuthFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupData: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
        {
          email: signupData.payload.newEmail,
          password: signupData.payload.newPassword,
          returnSecureToken: true
        })
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(Number(resData.expiresIn) * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(Number(resData.expiresIn) * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          }));
    }),
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => this.router.navigate(['/'])));

  @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {type: 'nothing'};
      } else {
        if (userData._token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.AuthSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate)
          });
        }
        return {type: 'nothing'};
      }
    }));

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogOutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    }));

  constructor(private http: HttpClient,
              private actions$: Actions,
              private router: Router,
              private authService: AuthService) {
  }
}
