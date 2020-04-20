import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {exhaustMap, take} from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap(authData => {
        if (!authData.user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone(
          {
            params: new HttpParams().set('auth', authData.user.token)
          });
        return next.handle(modifiedReq);
      }));
  }
}
