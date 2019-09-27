import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://127.0.0.1:8080/';
  }

  public fetch<T>(resource: string, options?: any): Observable<T> {
    const url = this.getUrl(resource, options);
    return this.http.get<T>(url);
  }

  public post<T>(resource: string, data: any): Observable<T> {
    const url = this.getUrl(resource);
    return this.http.post<T>(url, data);
  }

  public update(url, data): Promise<any> {
    return this.http.put<any>(url + '/' + data._id, data)
      .pipe(
        tap(() => null, (error) => {
          console.log(error);
        }),
        map((response) => response.result))
      .toPromise();
  }

  public delete(url, data) {
    return this.http.delete<any>(url + '/' + data._id)
      .pipe(
        tap(() => null, (error) => {
          console.log(error);
        }),
        map((response) => response.result))
      .toPromise();
  }

  private getUrl(resource: string, options?: any): string {
    let query = '';

    if (options) {
      const queryProperties: string[] = Object.getOwnPropertyNames(options);
      if (queryProperties.length) {
        query = '?' + queryProperties.map((queryProperty: string): string => queryProperty + '=' + options[queryProperty]).join('&');
      }
    }

    return this.endpoint + resource + '/' + query;
  }
}
