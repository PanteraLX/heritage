import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(() => this.handleRoute(request, next)))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  private handleRoute(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, }: HttpRequest<any> = request;
    switch (true) {
      case url.endsWith('/users/authenticate') && method === 'POST':
        return this.authenticate(request);
      case url.endsWith('/users/register') && method === 'POST':
        return this.register(request);
      case url.endsWith('/users') && method === 'GET':
        return this.getUsers(request);
      case url.match(/\/users\/\d+$/) && method === 'DELETE':
        return this.deleteUser(request);
      default:
        // pass through any requests not handled above
        return next.handle(request);
    }
  }

  // route functions

  private authenticate(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const {body}: HttpRequest<any> = request;
    const {username, password} = body;
    const user = users.find(x => x.username === username && x.password === password);
    if (!user) {
      return this.error('Username or password is incorrect');
    }
    return this.ok({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: 'fake-jwt-token'
    });
  }

  private register(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const {body: user}: HttpRequest<any> = request;

    if (users.find(x => x.username === user.username)) {
      return this.error('Username "' + user.username + '" is already taken');
    }

    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return this.ok();
  }

  private getUsers(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const {headers}: HttpRequest<any> = request;
    if (!this.isLoggedIn(headers)) {
      return this.unauthorized();
    }
    return this.ok(users);
  }

  private deleteUser(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const {url, headers}: HttpRequest<any> = request;
    if (!this.isLoggedIn(headers)) {
      return this.unauthorized();
    }

    users = users.filter(x => x.id !== this.idFromUrl(url));
    localStorage.setItem('users', JSON.stringify(users));
    return this.ok();
  }

  // helper functions

  private ok(body?): Observable<HttpResponse<any>> {
    return of(new HttpResponse({status: 200, body}));
  }

  private error(message) {
    return throwError({error: {message}});
  }

  private unauthorized() {
    return throwError({status: 401, error: {message: 'Unauthorised'}});
  }

  private isLoggedIn(headers: HttpHeaders) {
    return headers.get('Authorization') === 'fake-jwt-token';
  }

  private idFromUrl(url: string) {
    const urlParts = url.split('/');
    return Number.parseInt(urlParts[urlParts.length - 1], 10);
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
