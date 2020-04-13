import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(newEmail: string, newPassword: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCTXsSVfQXF85m9R8I4f9N2u5fwZ2-rdk',
      {
        email: newEmail,
        password: newPassword,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred!';

      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }

      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account!';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';
          break;
      }
      return throwError(errorMessage);
    }));
  }

  login(newEmail: string, newPassword: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCTXsSVfQXF85m9R8I4f9N2u5fwZ2-rdk',
      {
        email: newEmail,
        password: newPassword,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred!';

      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }

      switch (errorResponse.error.error.message) {
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
      return throwError(errorMessage);
    }));
  }
}
